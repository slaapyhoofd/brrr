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
import { createWallet } from './wallet';
import { enableLndHub } from './lndhub';
import { createInvoice, payInvoice } from './invoice';

const safeQr = async (value?: string): Promise<string | undefined> =>
  value ? await QRCode.toDataURL(value) : undefined;

export async function brrr(
  parametersBatch: IParametersBatch,
  parametersInvoice: IParametersInvoice,
  parametersLnurlP: IParametersLnurlP,
  parametersLnurlW: IParametersLnurlW,
  onProgress: (index: number, message: string) => void,
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

  for (let i = 1; i <= numberOfWallets; i++) {
    const walletName = `${namePrefix}${(i + '').padStart(3, '0')}`;

    // create the wallet
    onProgress(i, `Creating wallet ${walletName}`);
    const wallet = await createWallet(walletName, parametersBatch, ph);
    const { adminId, readKey, userId } = wallet;

    // enable lnurlp
    const lnUrlP = lnurlPEnabled
      ? await createLnurlP(parametersLnurlP, adminId, userId, readKey, ph)
      : undefined;

    // enable lnurlw
    const lnUrlW = lnurlWEnabled
      ? await createLnurlW(parametersLnurlW, adminId, userId, readKey, ph)
      : undefined;

    // enable BlueWallet import
    const adminUrlLndHub = lndHubEnabled
      ? await enableLndHub(adminId, userId, readKey, ph)
      : undefined;

    // enable invoices and pay them
    if (invoiceEnabled && parametersBatch.adminId) {
      const invoice = await createInvoice(parametersInvoice, readKey, ph);
      onProgress(i, `Filling wallet ${walletName}`);
      await payInvoice(invoice.payment_request, parametersBatch.adminId, ph);
    }

    // create QRs
    const adminUrlLndHubQR = await safeQr(adminUrlLndHub);
    const lnUrlPQR = await safeQr(lnUrlW);
    const lnUrlWQR = await safeQr(lnUrlP);

    wallets.push({
      ...wallet,
      walletName,
      adminUrlLndHub,
      adminUrlLndHubQR,
      lnUrlP,
      lnUrlPQR,
      lnUrlW,
      lnUrlWQR,
    });
  }

  return wallets;
}
