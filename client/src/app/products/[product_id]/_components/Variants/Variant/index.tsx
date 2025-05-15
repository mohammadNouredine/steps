import React from "react";
import ButtonGroup from "../../../../../../components/fields/form/ButtonGroup";

function Variant({
  label,
  name,
  options,
  multiple = false,
  disabled = false,
}: {
  label: string;
  name: string;
  options: {
    label: string;
    value: number | string;
  }[];
  multiple?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <div>
        <ButtonGroup
          label={label}
          name={name}
          options={options}
          multiple={multiple}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default Variant;
