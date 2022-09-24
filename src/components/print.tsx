import * as React from 'react';
import { IWalletInfo } from '../interfaces';

export interface IPrintProps {
  wallets: IWalletInfo[];
}

export const Print = ({ wallets }: IPrintProps): JSX.Element => (
  <div className="print">
    <div className="columns">
      {wallets.map((w, i) => (
        <div className="column" key={`wallet-${i}`}>
          <div className="box">
            <img alt={w.walletName} src={w.adminUrlLndHubQR} className="box-img" />
            <p className="box-tag">{w.walletName}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
