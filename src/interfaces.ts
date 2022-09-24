export interface IAppState {
  batchRunning: boolean;
  currentWallet?: IWalletInfo;
  currentWalletIndex: number;
  parametersBatch: IParametersBatch;
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

export interface IWalletInfo {
  adminUrlLnBits: string;
  adminUrlLnBitsQR?: string;
  adminUrlLndHub: string;
  adminUrlLndHubQR?: string;
  lnUrlW: string;
  walletName?: string;
}
