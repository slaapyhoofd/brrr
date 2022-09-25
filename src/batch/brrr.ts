import { createWallet } from './create';
import { IParametersBatch, IParametersLnurlP, IParametersLnurlW, IWalletInfo } from '../interfaces';
import * as QRCode from 'qrcode';
import ProxyHandler from '../util/post';

const safeQr = async (value?: string): Promise<string | undefined> =>
  value ? await QRCode.toDataURL(value) : undefined;

export async function brrr(
  parametersBatch: IParametersBatch,
  parametersLnurlP: IParametersLnurlP,
  parametersLnurlW: IParametersLnurlW,
  onProgress: (index: number, message: string) => void,
): Promise<IWalletInfo[]> {
  const { baseUrl, numberOfWallets, namePrefix, proxyUrl } = parametersBatch;
  const proxyHandler = new ProxyHandler(baseUrl, proxyUrl);

  const wallets: IWalletInfo[] = [];
  for (let i = 1; i <= numberOfWallets; i++) {
    const walletName = `${namePrefix}${(i + '').padStart(3, '0')}`;
    onProgress(i, `Creating wallet ${walletName}`);
    const wallet = await createWallet(
      walletName,
      parametersBatch,
      parametersLnurlW,
      parametersLnurlP,
      proxyHandler,
    );
    const adminUrlLndHubQR = await safeQr(wallet.adminUrlLndHub);
    const lnUrlPQR = await safeQr(wallet.lnUrlW);
    const lnUrlWQR = await safeQr(wallet.lnUrlP);

    wallets.push({ ...wallet, walletName, adminUrlLndHubQR, lnUrlPQR, lnUrlWQR });
  }

  return wallets;
}
