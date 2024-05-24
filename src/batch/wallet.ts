import { IParametersBatch, IWalletInfo } from '../interfaces';
import ProxyHandler from '../util/post';

export const createWallet = async (
  walletName: string,
  parametersBatch: IParametersBatch,
  ph: ProxyHandler,
): Promise<IWalletInfo> => {
  try {
    const { userId: adminUserId, adminId } = parametersBatch;

    // create wallet
    const responseWallet = await ph.post(
      `/usermanager/api/v1/users`,
      {
        admin_id: adminUserId,
        wallet_name: walletName,
        user_name: window.crypto.randomUUID(),
        email: '',
        password: '',
      },
      adminId,
    );
    const walletData = await responseWallet.json();

    // extract generated wallet info
    const userId = walletData.id;
    const walletId = walletData.wallets[0].id;
    const adminKey = walletData.wallets[0].adminkey;
    const inKey = walletData.wallets[0].inkey;
    const adminUrlLnBits = `${ph.getBase()}/wallet?usr=${userId}&wal=${walletId}`;

    return {
      adminId: adminKey,
      readKey: inKey,
      adminUrlLnBits,
      userId,
      walletName,
    };
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getBalance = async (inKey: string, ph: ProxyHandler): Promise<number> => {
  try {
    const response = await ph.get('/api/v1/wallet', inKey);
    const info = await response.json();
    return info.balance || 0;
  } catch (e: unknown) {
    return Promise.reject(e);
  }
};
