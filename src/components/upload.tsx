import * as React from 'react';

export interface IFileUploadProps {
  id: string;
  label: string;
  onUpload(data: any): void;
}

export const FileUpload = ({ label, id, onUpload }: IFileUploadProps) => {
  const jsonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target!.files![0], 'UTF-8');
    fileReader.onload = (e) => {
      onUpload(JSON.parse(e.target!.result as string));
    };
  };
  return (
    <label htmlFor={id}>
      {label}
      <input id={id} type="file" onChange={jsonFileUpload} />
    </label>
  );
};
