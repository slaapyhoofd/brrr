import * as React from 'react';
import { IWalletInfo } from '../interfaces';

interface IWalletProps {
  wallet?: IWalletInfo;
  next(): void;
  previous(): void;
  write(): void;
}

export const Wallet = ({ wallet, next, previous, write }: IWalletProps) => {
  if (!wallet) {
    return null;
  }

  return (
    <article>
      <header>{wallet.walletName}</header>
      <img alt={wallet.walletName} src={wallet.adminUrlLndHubQR} />
      <footer>
        <div className="grid">
          <button id="previous" onClick={() => previous()}>
            Previous
          </button>
          <button id="write" onClick={() => write()}>
            Write
          </button>
          <button id="next" onClick={() => next()}>
            Next
          </button>
        </div>
      </footer>
    </article>
  );
};
