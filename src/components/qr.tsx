import { Checkbox } from './checkbox';
import { OutputTypes } from '../interfaces';

interface IQRProps {
  qr?: string;
  checked: boolean;
  type: OutputTypes;
  onChange(v: boolean): void;
}

export const QR = ({ checked, onChange, qr, type }: IQRProps) => {
  return qr ? (
    <div className="center qr">
      <div>
        <img alt={type} src={qr} />
        <Checkbox id={type} value={checked} label={type} onChange={(v) => onChange(v)} />
      </div>
    </div>
  ) : null;
};
