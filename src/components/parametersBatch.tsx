import * as React from 'react';
import { IParametersBatch, IWalletInfo } from '../interfaces';
import { Field } from './field';
import { FileUpload } from './upload';
import { FileDownload } from './download';

interface IParametersBatchProps {
  parameters: IParametersBatch;
  wallets: IWalletInfo[];

  brrr(): void;
  updateParameters(parameters: IParametersBatch): void;
  updateWallets(wallets: IWalletInfo[]): void;
}

export const ParametersBatch = ({
  parameters,
  wallets,
  brrr,
  updateParameters,
  updateWallets,
}: IParametersBatchProps) => {
  const { adminId, baseUrl, namePrefix, numberOfWallets, proxyUrl, readKey } = parameters;

  const adminIdRef = React.useRef<HTMLInputElement>(null);
  const baseUrlRef = React.useRef<HTMLInputElement>(null);
  const namePrefixRef = React.useRef<HTMLInputElement>(null);
  const numberOfWalletsRef = React.useRef<HTMLInputElement>(null);
  const readKeyRef = React.useRef<HTMLInputElement>(null);

  const change = () => {
    updateParameters({
      adminId: adminIdRef.current!.value,
      baseUrl: baseUrlRef.current!.value,
      namePrefix: namePrefixRef.current!.value,
      numberOfWallets: parseInt(numberOfWalletsRef.current!.value, 10) || 1,
      readKey: readKeyRef.current!.value,
      proxyUrl,
    });
  };

  return (
    <article>
      <header>Batch parameters</header>
      <div className="grid">
        <div>
          <Field id="baseUrl" label="LNBits url" value={baseUrl} onChange={change} />
          <Field id="adminId" label="LNBits admin id" value={adminId || ''} onChange={change} />
          <Field id="readKey" label="LNBits read key" value={readKey || ''} onChange={change} />
        </div>
        <div>
          <Field id="namePrefix" label="Name prefix" value={namePrefix} onChange={change} />
          <Field
            id="numberOfWallets"
            label="Number of wallets"
            value={numberOfWallets + ''}
            type="number"
            onChange={change}
          />
          <FileUpload id="upload" label="Upload wallets" onUpload={(d) => updateWallets(d)} />
        </div>
      </div>
      <footer>
        <div className="grid">
          <FileDownload
            fileName="wallets"
            caption="Download wallets"
            data={wallets}
            disabled={wallets.length === 0}
          />
          <button id="brrr" onClick={() => brrr()}>
            Brrr...
          </button>
        </div>
      </footer>
    </article>
  );
};
