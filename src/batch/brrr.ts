import { createWallet } from './create';
import { IAppState, IWalletInfo } from '../interfaces';
import * as QRCode from 'qrcode';
import ProxyHandler from '../util/post';

export async function brrr(parameters: IAppState): Promise<IWalletInfo[]> {
  const { adminId, baseUrl, numberOfWallets, namePrefix, proxyUrl, readKey } = parameters;
  const proxyHandler = new ProxyHandler(baseUrl, proxyUrl);

  const wallets = [];
  for (let i = 0; i < numberOfWallets; i++) {
    const walletName = `${namePrefix}${(i + 1 + '').padStart(3, '0')}`;
    const wallet = await createWallet(
      proxyHandler,
      walletName,
      window.crypto.randomUUID(),
      adminId,
      readKey,
    );
    const adminUrlLnBitsQR = await QRCode.toDataURL(wallet.adminUrlLnBits);
    const adminUrlLndHubQR = await QRCode.toDataURL(wallet.adminUrlLndHub);

    wallets.push({ ...wallet, walletName, adminUrlLndHubQR, adminUrlLnBitsQR });
  }

  return wallets;
}
