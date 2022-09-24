export interface IAppState {
  batchRunning: boolean;
  currentWallet?: IWalletInfo;
  currentWalletIndex: number;
  parametersBatch: IParametersBatch;
  parametersLnurl: IParametersLnurl;
  wallets: IWalletInfo[];
  writing: boolean;
}

export interface IParametersBatch {
  adminId?: string;
  baseUrl: string;
  namePrefix: string;
  numberOfWallets: number;
  proxyUrl: string;
  readKey?: string;
}

export interface IParametersLnurl {
  min_withdrawable: number;
  max_withdrawable: number;
  title: string;
  uses: number;
  wait_time: number;
  webhook_url?: string;
}

export interface IWalletInfo {
  adminUrlLnBits: string;
  adminUrlLnBitsQR?: string;
  adminUrlLndHub: string;
  adminUrlLndHubQR?: string;
  lnUrlW: string;
  walletName?: string;
}
