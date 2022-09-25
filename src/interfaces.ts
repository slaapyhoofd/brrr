export interface IAppState {
  batchRunning: boolean;
  currentWallet?: IWalletInfo;
  currentWalletIndex: number;
  parametersBatch: IParametersBatch;
  parametersLnurlP: IParametersLnurlP;
  parametersLnurlW: IParametersLnurlW;
  wallets: IWalletInfo[];
  writing: boolean;
}

export interface IParametersBatch {
  adminId?: string;
  baseUrl: string;
  lndHubEnabled: boolean;
  lnurlPEnabled: boolean;
  lnurlWEnabled: boolean;
  namePrefix: string;
  numberOfWallets: number;
  proxyUrl: string;
  readKey?: string;
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

export interface IWalletInfo {
  adminId: string;
  adminUrlLnBits: string;
  adminUrlLndHub?: string;
  adminUrlLndHubQR?: string;
  lnUrlP?: string;
  lnUrlPQR?: string;
  lnUrlW?: string;
  lnUrlWQR?: string;
  readKey: string;
  walletName?: string;
}

export type ExtensionType = 'withdraw' | 'lndhub' | 'lnurlp';
