import * as React from 'react';
import { IWalletInfo } from '../interfaces';

export interface IFileUploadProps {
  id: string;
  label: string;
  onUpload(wallets: IWalletInfo[]): void;
}

export const FileUpload = ({ label, id, onUpload }: IFileUploadProps) => {
  const jsonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target && e.target.files) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (ev) => {
        if (ev.target && ev.target.result && typeof ev.target.result === 'string') {
          onUpload(JSON.parse(ev.target.result));
        }
      };
    }
  };
  return (
    <label htmlFor={id}>
      {label}
      <input id={id} type="file" onChange={jsonFileUpload} />
    </label>
  );
};
