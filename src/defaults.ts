import { IAppState } from './interfaces';

const DefaultMax = 200000;

export const DefaultAppState: IAppState = {
  batchRunning: false,
  currentWalletIndex: 0,
  parametersBatch: {
    adminId: '',
    baseUrl: 'https://legend.lnbits.com',
    lndHubEnabled: true,
    lnurlPEnabled: false,
    lnurlWEnabled: true,
    namePrefix: 'BATCH',
    numberOfWallets: 2,
    proxyUrl: 'proxy.php',
    readKey: '',
  },
  parametersLnurlP: {
    description: 'lnurlp deposit',
    min: 1,
    max: DefaultMax,
    comment_chars: 20,
  },
  parametersLnurlW: {
    max_withdrawable: DefaultMax,
    min_withdrawable: 10,
    title: 'lnurlw payment',
    uses: 50,
    wait_time: 10,
  },
  wallets: [],
  writing: false,
};
