import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { Checkbox } from "rsuite";

// Helper function to get nested object values
function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : false;
  }, obj);
}

function CheckboxField({
  title,
  description,
  name,
  disabled,
}: {
  title?: string;
  description?: string;
  name: string;
  disabled?: boolean;
}) {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: any;
  }>();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(getNestedValue(values, name));
  }, [values, name]);

  return (
    <div className="cursor-pointer">
      <Checkbox
        disabled={disabled}
        checked={checked}
        onChange={(_, checked) => {
          setFieldValue(name, checked);
        }}
        color="red"
      >
        {title && <p className="text-gray-900 font-medium">{title}</p>}
        {description && <p className="text-gray-500">{description} </p>}
      </Checkbox>
    </div>
  );
}

export default CheckboxField;
