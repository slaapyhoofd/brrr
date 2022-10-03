import { IAppState } from './interfaces';

const DefaultMax = 200000;

export const LightningUrlPrefix = 'lightning:';

export const DefaultAppState: IAppState = {
  batchRunning: false,
  currentWalletIndex: 0,
  parametersBatch: {
    adminId: '',
    baseUrl: 'https://lnbits.yourdomain.com',
    invoiceEnabled: false,
    lndHubEnabled: true,
    lnurlPEnabled: false,
    lnurlWEnabled: true,
    namePrefix: 'BRRR',
    numberOfWallets: 2,
    proxyUrl: 'proxy.php',
    readKey: '',
  },
  parametersInvoice: {
    amount: 10,
    out: false,
    unit: 'sat',
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
  parametersOutput: {
    nfc: 'lnurlw',
    qr: ['lndhub'],
  },
  progress: 0,
  wallets: [],
  writing: false,
};
