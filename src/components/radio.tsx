import { OutputTypes } from '../interfaces';

export interface ICheckboxProps {
  value: OutputTypes;
  onChange(value: OutputTypes): void;
}

export const Radio = ({ onChange, value }: ICheckboxProps): JSX.Element => (
  <fieldset>
    <legend>What lnurl do you want to write to the card?</legend>
    <label htmlFor="lnurlp">
      <input
        type="radio"
        id="lnurlp"
        name="size"
        value="lnurlp"
        checked={value === 'lnurlp'}
        onChange={() => onChange(value === 'lnurlp' ? 'lnurlw' : 'lnurlp')}
      />
      write the lnurlp to the card
    </label>
    <label htmlFor="lnurlw">
      <input
        type="radio"
        id="lnurlw"
        name="size"
        value="lnurlw"
        checked={value === 'lnurlw'}
        onChange={() => onChange(value === 'lnurlw' ? 'lnurlp' : 'lnurlw')}
      />
      write the lnurlw to the card
    </label>
  </fieldset>
);
