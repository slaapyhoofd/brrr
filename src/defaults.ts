import { IAppState } from './interfaces';

const DefaultMax = 200000;

export const DefaultAppState: IAppState = {
  batchRunning: false,
  currentWalletIndex: 0,
  parametersBatch: {
    adminId: '',
    baseUrl: 'https://lnbits.yourdomain.com',
    lndHubEnabled: true,
    lnurlPEnabled: false,
    lnurlWEnabled: true,
    namePrefix: 'BRRR',
    numberOfWallets: 2,
    proxyUrl: 'proxy.php',
    readKey: '',
  },
  parametersLnurlP: {
    description: 'LNURLp / deposit',
    min: 1,
    max: DefaultMax,
    comment_chars: 20,
  },
  parametersLnurlW: {
    max_withdrawable: DefaultMax,
    min_withdrawable: 10,
    title: 'LNURLw / payment',
    uses: 50,
    wait_time: 10,
  },
  progress: 0,
  wallets: [],
  writing: false,
};
