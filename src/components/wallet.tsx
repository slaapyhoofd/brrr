import * as React from 'react';
import { IWalletInfo } from '../interfaces';

interface IWalletProps {
  wallet?: IWalletInfo;
}

export const Wallet = ({ wallet }: IWalletProps) => {
  if (!wallet) {
    return null;
  }

  return (
    <article>
      <header>{wallet.walletName}</header>
      <img alt={wallet.walletName} src={wallet.adminUrlLndHubQR} />
    </article>
  );
};
