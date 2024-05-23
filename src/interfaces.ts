export interface IAppState {
  batchRunning: boolean;
  currentWallet?: IWalletInfo;
  currentWalletIndex: number;
  parametersBatch: IParametersBatch;
  parametersInvoice: IParametersInvoice;
  parametersLnurlP: IParametersLnurlP;
  parametersLnurlW: IParametersLnurlW;
  parametersOutput: IParametersOutput;
  progress: number;
  progressMessage?: string;
  wallets: IWalletInfo[];
  writing: boolean;
}

export interface IParametersBatch {
  userId?: string;
  baseUrl: string;
  invoiceEnabled: boolean;
  lndHubEnabled: boolean;
  lnurlPEnabled: boolean;
  lnurlWEnabled: boolean;
  namePrefix: string;
  numberOfWallets: number;
  proxyUrl: string;
  adminId?: string;
}

export interface IParametersLnurlW {
  min_withdrawable: number;
  max_withdrawable: number;
  title: string;
  uses: number;
  wait_time: number;
  webhook_url?: string;
}

export interface IParametersLnurlP {
  description: string;
  min: number;
  max: number;
  comment_chars: number;
  webhook_url?: string;
  success_text?: string;
  success_url?: string;
}

export interface IParametersInvoice {
  out: boolean;
  amount: number;
  memo?: string;
  unit: 'sat';
  webhook?: string;
}

export type OutputTypes = 'lnurlp' | 'lnurlw' | 'lndhub' | 'lnbits';

export interface IParametersOutput {
  nfc: OutputTypes;
  qr: OutputTypes[];
}

export interface IInvoice {
  payment_hash: string;
  payment_request: string;
}

export interface IWalletInfo {
  adminId: string;
  adminUrlLnBits: string;
  adminUrlLnBitsQR?: string;
  adminUrlLndHub?: string;
  adminUrlLndHubQR?: string;
  lnUrlP?: string;
  lnUrlPQR?: string;
  lnUrlW?: string;
  lnUrlWQR?: string;
  readKey: string;
  userId: string;
  walletName?: string;
}

export type ExtensionType = 'withdraw' | 'lndhub' | 'lnurlp';
