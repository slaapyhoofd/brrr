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
import { ParametersLnurlW } from './parametersLnurlW';
import { ParametersLnurlP } from './parametersLnurlP';

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
    const {
      currentWallet,
      currentWalletIndex,
      parametersBatch,
      parametersLnurlP,
      parametersLnurlW,
      progress,
      progressMessage,
      wallets,
    } = this.state;

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
            progress={progress}
            progressMessage={progressMessage}
            wallets={wallets}
            brrr={() => this.brrr()}
            updateParameters={(p) => this.setState({ parametersBatch: p })}
            updateWallets={(w) =>
              this.setState({ wallets: w, currentWallet: w[currentWalletIndex] })
            }
          />
          <ParametersLnurlW
            enabled={parametersBatch.lnurlWEnabled}
            parameters={parametersLnurlW}
            updateParameters={(p) => this.setState({ parametersLnurlW: p })}
          />
          <ParametersLnurlP
            enabled={parametersBatch.lnurlPEnabled}
            parameters={parametersLnurlP}
            updateParameters={(p) => this.setState({ parametersLnurlP: p })}
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
    try {
      const { parametersLnurlP, parametersLnurlW, parametersBatch, currentWalletIndex } =
        this.state;
      this.setState({ batchRunning: true });
      const wallets = await brrr(parametersBatch, parametersLnurlP, parametersLnurlW, (i, m) =>
        this.setState({ progress: i, progressMessage: m }),
      );
      this.setState({
        batchRunning: false,
        currentWallet: wallets[currentWalletIndex],
        progress: parametersBatch.numberOfWallets + 1,
        progressMessage: 'Done!',
        wallets,
      });
    } catch (e) {
      this.notyf.error('Error generating wallets!');
    }
  }

  private setCurrentWallet(index: number): void {
    const newIndex = index < 0 ? 0 : index;
    this.setState({ currentWallet: this.state.wallets[newIndex], currentWalletIndex: newIndex });
  }

  private async write() {
    try {
      if (this.state.currentWallet && this.state.currentWallet.lnUrlW) {
        this.setState({ writing: true });
        this.notyf.success('Starting write!');
        await this.lnurlWriter.writeUrl(this.state.currentWallet.lnUrlW);
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
