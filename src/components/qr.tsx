interface IQRProps {
  qr?: string;
  text: string;
}

export const QR = ({ qr, text }: IQRProps) => {
  return qr ? (
    <div className="center">
      <div>
        <img alt={text} src={qr} />
        <p>{text}</p>
      </div>
    </div>
  ) : null;
};
