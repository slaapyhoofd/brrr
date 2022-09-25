import { createWallet } from './create';
import { IParametersBatch, IParametersLnurlP, IParametersLnurlW, IWalletInfo } from '../interfaces';
import * as QRCode from 'qrcode';
import ProxyHandler from '../util/post';

export async function brrr(
  parametersBatch: IParametersBatch,
  parametersLnurlP: IParametersLnurlP,
  parametersLnurlW: IParametersLnurlW,
): Promise<IWalletInfo[]> {
  const { baseUrl, numberOfWallets, namePrefix, proxyUrl } = parametersBatch;
  const proxyHandler = new ProxyHandler(baseUrl, proxyUrl);

  const wallets: IWalletInfo[] = [];
  for (let i = 0; i < numberOfWallets; i++) {
    const walletName = `${namePrefix}${(i + 1 + '').padStart(3, '0')}`;
    const wallet = await createWallet(
      walletName,
      parametersBatch,
      parametersLnurlW,
      parametersLnurlP,
      proxyHandler,
    );
    const adminUrlLndHubQR = await QRCode.toDataURL(wallet.adminUrlLndHub || '');
    const lnUrlPQR = await QRCode.toDataURL(wallet.lnUrlW || '');
    const lnUrlWQR = await QRCode.toDataURL(wallet.lnUrlP || '');

    wallets.push({ ...wallet, walletName, adminUrlLndHubQR, lnUrlPQR, lnUrlWQR });
  }

  return wallets;
}
