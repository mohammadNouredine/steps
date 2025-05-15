import { OptionType } from "@/types/UI/fields";
import { useFormikContext } from "formik";
import { Radio, RadioGroup } from "rsuite";

interface RadioGroupField {
  description: string;
  parseBoolean?: boolean;
  name: string;
  disabled?: boolean;
  data?: OptionType[]; // Ensure OptionType has `value` and `label` properties.
  isLoading?: boolean;
}

function RadioGroupField({
  description,
  parseBoolean,
  name,
  disabled = false, // Default value to avoid undefined behavior.
  data = [],
  isLoading = false,
}: RadioGroupField) {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: any;
  }>();

  return (
    <div className="cursor-pointer">
      <p className="text-gray-900 font-medium">{description}</p>
      <RadioGroup
        className="gap-x-2"
        name={name}
        inline
        value={parseBoolean ? values[name].toString() : values[name]}
        onChange={(value) =>
          setFieldValue(
            name,
            parseBoolean
              ? value === "true"
              : data.find((option) => option.value === value)?.value
          )
        }
        disabled={disabled}
      >
        {data.map((option) => (
          <>
            {isLoading ? (
              <div className="w-32 h-7 rounded-md bg-gray-300 animate-pulse " />
            ) : (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            )}
          </>
        ))}
      </RadioGroup>
    </div>
  );
}

export default RadioGroupField;
