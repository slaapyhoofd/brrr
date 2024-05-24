import ProxyHandler from '../util/post';
import { IParametersLnurlP, IParametersLnurlW } from '../interfaces';
import { enablePlugin } from './plugin';

export const createLnurlW = async (
  parameters: IParametersLnurlW,
  adminId: string,
  userId: string,
  readKey: string,
  ph: ProxyHandler,
): Promise<string> => {
  try {
    await enablePlugin('withdraw', userId, readKey, ph);
    const responseLnurlw = await ph.post(
      `/withdraw/api/v1/links`,
      {
        ...parameters,
        is_unique: false,
      },
      adminId,
    );
    return (await responseLnurlw.json()).lnurl;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const createLnurlP = async (
  parameters: IParametersLnurlP,
  adminKey: string,
  userId: string,
  inKey: string,
  ph: ProxyHandler,
): Promise<string> => {
  try {
    await enablePlugin('lnurlp', userId, inKey, ph);
    const responseLnurlw = await ph.post(`/lnurlp/api/v1/links`, parameters, adminKey);
    return (await responseLnurlw.json()).lnurl;
  } catch (e) {
    return Promise.reject(e);
  }
};
