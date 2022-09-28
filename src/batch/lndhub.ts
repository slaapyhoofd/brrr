import ProxyHandler from '../util/post';
import { enablePlugin } from './plugin';

export const enableLndHub = async (
  adminKey: string,
  userId: string,
  inKey: string,
  ph: ProxyHandler,
): Promise<string> => {
  try {
    await enablePlugin('lndhub', userId, inKey, ph);
    return `lndhub://admin:${adminKey}@${ph.getBase()}/lndhub/ext/`;
  } catch (e) {
    return Promise.reject(e);
  }
};
