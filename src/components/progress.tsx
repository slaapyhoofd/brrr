interface IProgressProps {
  value: number;
  max: number;
  message?: string;
}

export const Progress = ({ value, max, message }: IProgressProps) => {
  return value !== 0 ? (
    <div>
      <progress value={value} max={max} />
      <small>{message}</small>
    </div>
  ) : null;
};
