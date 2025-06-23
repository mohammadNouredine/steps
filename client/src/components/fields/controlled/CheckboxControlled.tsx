import { Checkbox } from "rsuite";

interface CheckboxControlledProps {
  title?: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function CheckboxControlled({
  title,
  description,
  checked,
  onChange,
  disabled = false,
}: CheckboxControlledProps) {
  return (
    <div className="cursor-pointer">
      <Checkbox
        disabled={disabled}
        checked={checked}
        onChange={(_, isChecked) => {
          onChange(isChecked);
        }}
        color="red"
      >
        {title && <p className="text-gray-900 font-medium">{title}</p>}
        {description && <p className="text-gray-500">{description}</p>}
      </Checkbox>
    </div>
  );
}

export default CheckboxControlled;
