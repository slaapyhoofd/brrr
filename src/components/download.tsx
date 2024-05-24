export interface IFileDownloadProps {
  caption: string;
  data: unknown;
  disabled: boolean;
  fileName: string;
}

export const FileDownload = ({ caption, data, disabled, fileName }: IFileDownloadProps) => {
  const jsonFileDownload = () => {
    const jsonData = new Blob([JSON.stringify(data, null, 2)], { type: 'text/json' });
    const jsonURL = window.URL.createObjectURL(jsonData);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute('download', `${fileName}.json`);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={jsonFileDownload} disabled={disabled}>
      {caption}
    </button>
  );
};
