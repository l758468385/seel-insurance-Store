import { JSX } from 'preact';
import './CheckBox.scss';

interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CheckBox({ checked, onChange }: CheckBoxProps): JSX.Element {
  const handleChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    onChange(target.checked);
  };

  return (
    <label className="seel-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="seel-checkbox__input"
      />
      <span className="seel-checkbox__checkmark"></span>
    </label>
  );
}
