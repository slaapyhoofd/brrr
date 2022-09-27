export interface ICheckboxProps {
  id: string;
  label: string;
  value: boolean;
  onChange(value: boolean): void;
}

export const Checkbox = ({ id, label, onChange, value }: ICheckboxProps): JSX.Element => (
  <fieldset>
    <label htmlFor={id}>
      <input
        role="switch"
        type="checkbox"
        id={id}
        name={id}
        placeholder={label}
        checked={value}
        onChange={(e) => onChange(e.currentTarget.checked)}
      />
      {label}
    </label>
  </fieldset>
);
