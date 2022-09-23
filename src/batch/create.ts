import ProxyHandler from '../util/post';
import { IWalletInfo } from '../interfaces';

export async function createWallet(
  ph: ProxyHandler,
  walletName: string,
  userName: string,
  adminId?: string,
  readKey?: string,
): Promise<IWalletInfo> {
  try {
    const responseWallet = await ph.post(
      `/usermanager/api/v1/users`,
      {
        admin_id: adminId,
        wallet_name: walletName,
        user_name: userName,
        email: '',
        password: '',
      },
      readKey,
    );
    const walletData = await responseWallet.json();

    // extract generated wallet info
    const userId = walletData.id;
    const walletId = walletData.wallets[0].id;
    const adminKey = walletData.wallets[0].adminkey;
    const inKey = walletData.wallets[0].inkey;
    const adminUrlLnBits = `${ph.getBase()}/wallet?usr=${userId}&wal=${walletId}`;

    // enable lnurlw
    await ph.post(
      `/usermanager/api/v1/extensions`,
      {
        userid: userId,
        extension: 'withdraw',
        active: true,
      },
      inKey,
    );

    const responseLnurlw = await ph.post(
      `/withdraw/api/v1/links`,
      {
        title: inKey,
        min_withdrawable: 10,
        max_withdrawable: 200000,
        uses: 250,
        wait_time: 10,
        is_unique: false,
      },
      adminKey,
    );
    const lnUrlW = (await responseLnurlw.json()).lnurl;

    // enable bluewallet import
    await ph.post(
      `/usermanager/api/v1/extensions`,
      {
        userid: userId,
        extension: 'lndhub',
        active: true,
      },
      inKey,
    );

    const adminUrlLndHub = `lndhub://admin:${adminKey}@${ph.getBase()}/lndhub/ext/`;

    return { adminUrlLnBits, adminUrlLndHub, lnUrlW, walletName };
  } catch (e) {
    return Promise.reject(e);
  }
}
