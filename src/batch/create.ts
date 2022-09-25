import ProxyHandler from '../util/post';
import {
  IParametersBatch,
  IParametersLnurlW,
  IWalletInfo,
  ExtensionType,
  IParametersLnurlP,
} from '../interfaces';

export async function createWallet(
  walletName: string,
  parametersBatch: IParametersBatch,
  parametersLnurlW: IParametersLnurlW,
  parametersLnurlP: IParametersLnurlP,
  ph: ProxyHandler,
): Promise<IWalletInfo> {
  try {
    const { adminId, readKey, lndHubEnabled, lnurlPEnabled, lnurlWEnabled } = parametersBatch;

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

    // enable lnurlp
    const lnUrlP = lnurlPEnabled
      ? await createLnurlP(parametersLnurlP, adminKey, userId, inKey, ph)
      : undefined;

    // enable lnurlw
    const lnUrlW = lnurlWEnabled
      ? await createLnurlW(parametersLnurlW, adminKey, userId, inKey, ph)
      : undefined;

    // enable BlueWallet import
    const adminUrlLndHub = lndHubEnabled
      ? await enableLndHub(adminKey, userId, inKey, ph)
      : undefined;

    return {
      adminId: adminKey,
      readKey: inKey,
      adminUrlLnBits,
      adminUrlLndHub,
      lnUrlP,
      lnUrlW,
      walletName,
    };
  } catch (e) {
    return Promise.reject(e);
  }
}

async function createLnurlW(
  parameters: IParametersLnurlW,
  adminKey: string,
  userId: string,
  inKey: string,
  ph: ProxyHandler,
): Promise<string> {
  try {
    await enablePlugin('withdraw', userId, inKey, ph);
    const responseLnurlw = await ph.post(
      `/withdraw/api/v1/links`,
      {
        ...parameters,
        is_unique: false,
      },
      adminKey,
    );
    return (await responseLnurlw.json()).lnurl;
  } catch (e) {
    return Promise.reject(e);
  }
}

async function enableLndHub(
  adminKey: string,
  userId: string,
  inKey: string,
  ph: ProxyHandler,
): Promise<string> {
  try {
    await enablePlugin('lndhub', userId, inKey, ph);
    return `lndhub://admin:${adminKey}@${ph.getBase()}/lndhub/ext/`;
  } catch (e) {
    return Promise.reject(e);
  }
}

async function createLnurlP(
  parameters: IParametersLnurlP,
  adminKey: string,
  userId: string,
  inKey: string,
  ph: ProxyHandler,
): Promise<string> {
  try {
    await enablePlugin('lnurlp', userId, inKey, ph);
    const responseLnurlw = await ph.post(`/lnurlp/api/v1/links`, parameters, adminKey);
    return (await responseLnurlw.json()).lnurl;
  } catch (e) {
    return Promise.reject(e);
  }
}

async function enablePlugin(
  extension: ExtensionType,
  userId: string,
  inKey: string,
  ph: ProxyHandler,
) {
  try {
    return ph.post(
      `/usermanager/api/v1/extensions`,
      {
        userid: userId,
        extension: extension,
        active: true,
      },
      inKey,
    );
  } catch (e) {
    return Promise.reject(e);
  }
}
