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
  parametersLnurl: {
    max_withdrawable: 200000,
    min_withdrawable: 10,
    title: 'NFC Payment',
    uses: 50,
    wait_time: 10,
  },
  wallets: [],
  writing: false,
};
