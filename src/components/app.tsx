import * as React from 'react';
import { Notyf } from 'notyf';
import { IAppState } from '../interfaces';
import { ErrorReason, LnurlWriter } from '../util/lnurlwriter';
import { Wallet } from './wallet';
import { Print } from './print';
import { brrr } from '../batch/brrr';
import { Header } from './header';
import { DefaultAppState } from '../defaults';
import { ParametersBatch } from './parametersBatch';

export default class App extends React.Component<any, IAppState> {
  private readonly lnurlWriter: LnurlWriter;
  private readonly notyf: Notyf;

  constructor(props: any) {
    super(props);
    this.state = DefaultAppState;

    this.lnurlWriter = new LnurlWriter();
    this.notyf = new Notyf();
  }

  public render() {
    const { currentWallet, currentWalletIndex, parametersBatch, wallets } = this.state;

    const next = () =>
      currentWalletIndex === wallets.length - 1
        ? this.setCurrentWallet(0)
        : this.setCurrentWallet(currentWalletIndex + 1);

    const previous = () =>
      currentWalletIndex === 0
        ? this.setCurrentWallet(wallets.length - 1)
        : this.setCurrentWallet(currentWalletIndex - 1);

    return (
      <>
        <main className="container do-not-print">
          <Header />
          <ParametersBatch
            parameters={parametersBatch}
            wallets={wallets}
            brrr={() => this.brrr()}
            updateParameters={(p) => this.setState({ parametersBatch: p })}
            updateWallets={(w) =>
              this.setState({ wallets: w, currentWallet: w[currentWalletIndex] })
            }
          />
          <Wallet
            wallet={currentWallet}
            next={() => next()}
            previous={() => previous()}
            write={() => this.write()}
          />
        </main>
        <Print wallets={wallets} />
      </>
    );
  }

  private async brrr() {
    this.setState({ batchRunning: true });
    const wallets = await brrr(this.state.parametersBatch);
    this.setState({
      batchRunning: false,
      wallets,
      currentWallet: wallets[this.state.currentWalletIndex],
    });
  }

  private setCurrentWallet(index: number): void {
    const newIndex = index < 0 ? 0 : index;
    this.setState({ currentWallet: this.state.wallets[newIndex], currentWalletIndex: newIndex });
  }

  private async write() {
    try {
      if (this.state.currentWallet) {
        this.setState({ writing: true });
        this.notyf.success('Starting write!');
        await this.lnurlWriter.writeUrl(this.state.currentWallet?.lnUrlW);
        this.notyf.success('Lnurlw written!');
      } else {
        this.notyf.error('No lnurl available to write!');
      }
    } catch (e: any) {
      if (e in ErrorReason) {
        this.notyf.error(ErrorReason[e]);
      } else {
        this.notyf.error(e.message);
      }
    } finally {
      this.setState({ writing: false });
    }
  }
}
