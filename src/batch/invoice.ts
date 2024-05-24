import { IInvoice, IParametersInvoice } from '../interfaces';
import ProxyHandler from '../util/post';

export const createInvoice = async (
  parameters: IParametersInvoice,
  inKey: string,
  ph: ProxyHandler,
): Promise<IInvoice> => {
  try {
    const response = await ph.post('/api/v1/payments', parameters, inKey);
    return response.json();
  } catch (e: unknown) {
    return Promise.reject(e);
  }
};

export const payInvoice = async (
  bolt11: string,
  adminId: string,
  ph: ProxyHandler,
): Promise<string> => {
  try {
    const response = await ph.post('/api/v1/payments', { bolt11 }, adminId);
    return (await response.json()).payment_hash;
  } catch (e: unknown) {
    return Promise.reject(e);
  }
};
