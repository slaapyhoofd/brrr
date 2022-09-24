import { IAppState } from './interfaces';

export const DefaultAppState: IAppState = {
  batchRunning: false,
  currentWalletIndex: 0,
  parametersBatch: {
    adminId: '',
    baseUrl: 'https://legend.lnbits.com',
    namePrefix: 'BATCH',
    numberOfWallets: 2,
    proxyUrl: 'proxy.php',
    readKey: '',
  },
  wallets: [],
  writing: false,
};
