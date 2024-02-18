import { FC } from 'react';

interface IProps {
  label?: string;
  value: string;
  onChange(val: string): void;
}

export const Input: FC<IProps> = ({ label, value, onChange }) => (
  <div>
    {!!label && <span>{label}</span>}
    <input value={value} onChange={({ target: { value } }) => onChange(value)} />
  </div>
);
