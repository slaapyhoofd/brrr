import { createWallet } from './create';
import { IParametersBatch, IParametersLnurl, IWalletInfo } from '../interfaces';
import * as QRCode from 'qrcode';
import ProxyHandler from '../util/post';

export async function brrr(
  parametersBatch: IParametersBatch,
  parametersLnurl: IParametersLnurl,
): Promise<IWalletInfo[]> {
  const { baseUrl, numberOfWallets, namePrefix, proxyUrl } = parametersBatch;
  const proxyHandler = new ProxyHandler(baseUrl, proxyUrl);

  const wallets = [];
  for (let i = 0; i < numberOfWallets; i++) {
    const walletName = `${namePrefix}${(i + 1 + '').padStart(3, '0')}`;
    const wallet = await createWallet(walletName, parametersBatch, parametersLnurl, proxyHandler);
    const adminUrlLnBitsQR = await QRCode.toDataURL(wallet.adminUrlLnBits);
    const adminUrlLndHubQR = await QRCode.toDataURL(wallet.adminUrlLndHub);

    wallets.push({ ...wallet, walletName, adminUrlLndHubQR, adminUrlLnBitsQR });
  }

  return wallets;
}
