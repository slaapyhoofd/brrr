import ProxyHandler from '../util/post';
import { ExtensionType } from '../interfaces';

export const enablePlugin = async (
  extension: ExtensionType,
  userId: string,
  inKey: string,
  ph: ProxyHandler,
) => {
  try {
    return ph.post(
      `/usermanager/api/v1/extensions?extension=${extension}&userid=${userId}&active=true`,
      {},
      inKey,
    );
  } catch (e) {
    return Promise.reject(e);
  }
};
