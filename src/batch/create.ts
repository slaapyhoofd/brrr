import ProxyHandler from '../util/post';
import { IParametersBatch, IParametersLnurl, IWalletInfo } from '../interfaces';

export async function createWallet(
  walletName: string,
  parametersBatch: IParametersBatch,
  parametersLnurl: IParametersLnurl,
  ph: ProxyHandler,
): Promise<IWalletInfo> {
  try {
    const { adminId, readKey } = parametersBatch;

    // create wallet
    const responseWallet = await ph.post(
      `/usermanager/api/v1/users`,
      {
        admin_id: adminId,
        wallet_name: walletName,
        user_name: window.crypto.randomUUID(),
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
        ...parametersLnurl,
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
