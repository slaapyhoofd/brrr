import {
  IParametersBatch,
  IParametersInvoice,
  IParametersLnurlP,
  IParametersLnurlW,
  IWalletInfo,
} from '../interfaces';
import * as QRCode from 'qrcode';
import ProxyHandler from '../util/post';
import { createLnurlP, createLnurlW } from './lnurl';
import { createWallet, getBalance } from './wallet';
import { enableLndHub } from './lndhub';
import { createInvoice, payInvoice } from './invoice';
import { LightningUrlPrefix } from '../defaults';

const safeQr = async (value?: string): Promise<string | undefined> =>
  value ? await QRCode.toDataURL(value) : undefined;

export async function brrr(
  parametersBatch: IParametersBatch,
  parametersInvoice: IParametersInvoice,
  parametersLnurlP: IParametersLnurlP,
  parametersLnurlW: IParametersLnurlW,
  onProgress: (index: number, message: string) => void,
  onError: (message: string) => void,
): Promise<IWalletInfo[]> {
  const {
    baseUrl,
    invoiceEnabled,
    lndHubEnabled,
    lnurlPEnabled,
    lnurlWEnabled,
    numberOfWallets,
    namePrefix,
    proxyUrl,
  } = parametersBatch;
  const ph = new ProxyHandler(baseUrl, proxyUrl);
  const wallets: IWalletInfo[] = [];

  if (invoiceEnabled && parametersBatch.adminId) {
    const balance = await getBalance(parametersBatch.adminId, ph);
    // balance in msats, invoice amount is in sats
    const enoughFunding = balance / 1000 - numberOfWallets * parametersInvoice.amount > 0;
    if (!enoughFunding) {
      onError('Not enough balance to fund wallets!');
      return wallets;
    }
  }

  for (let i = 1; i <= numberOfWallets; i++) {
    const walletName = `${namePrefix}${(i + '').padStart(3, '0')}`;

    // create the wallet
    onProgress(i, `Creating wallet ${walletName}`);
    let wallet = await createWallet(walletName, parametersBatch, ph);
    const { adminId, readKey, userId } = wallet;

    // enable lnurlp
    if (lnurlPEnabled) {
      const lnUrlP = await createLnurlP(parametersLnurlP, adminId, userId, readKey, ph);
      const lnUrlPQR = await safeQr(LightningUrlPrefix + lnUrlP);
      wallet = { ...wallet, lnUrlP, lnUrlPQR };
    }

    // enable lnurlw
    if (lnurlWEnabled) {
      const lnUrlW = await createLnurlW(parametersLnurlW, adminId, userId, readKey, ph);
      const lnUrlWQR = await safeQr(LightningUrlPrefix + lnUrlW);
      wallet = { ...wallet, lnUrlW, lnUrlWQR };
    }

    // enable BlueWallet import
    if (lndHubEnabled) {
      const adminUrlLndHub = await enableLndHub(adminId, userId, readKey, ph);
      const adminUrlLndHubQR = await safeQr(adminUrlLndHub);
      wallet = { ...wallet, adminUrlLndHub, adminUrlLndHubQR };
    }

    // enable invoices and pay them
    if (invoiceEnabled && parametersBatch.adminId) {
      const invoice = await createInvoice(parametersInvoice, readKey, ph);
      onProgress(i, `Filling wallet ${walletName}`);
      await payInvoice(invoice.payment_request, parametersBatch.adminId, ph);
    }

    // create QRs
    const adminUrlLnBitsQR = await safeQr(wallet.adminUrlLnBits);

    wallets.push({
      ...wallet,
      walletName,
      adminUrlLnBitsQR,
    });
  }

  return wallets;
}
