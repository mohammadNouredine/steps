import { useFormikContext } from "formik";
import { Toggle } from "rsuite";
import { useState, useEffect } from "react";
import { cn } from "@/utils/cn";

export const getNestedValue = (obj: any, path: string) => {
  return path
    .split(".")
    .reduce(
      (acc, key) => (acc !== undefined && acc !== null ? acc[key] : undefined),
      obj
    );
};

function ToggleField({
  title,
  description,
  name,
  disabled,
  size = "md",
  checkInverse = false,
  onChange,
  isLoading = false,
  flexReverse = false,
}: {
  title?: string;
  description?: string;
  name: string;
  disabled?: boolean;
  checkInverse?: boolean;
  size?: "lg" | "md" | "sm";
  onChange?: (checked: boolean) => void;
  isLoading?: boolean;
  flexReverse?: boolean;
}) {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: any;
  }>();

  const [checked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    const fieldValue =
      getNestedValue(values, name) === "true" ||
      getNestedValue(values, name) === true;

    // Ensure the fieldValue is boolean or initialize it to false if undefined
    if (typeof fieldValue === "boolean") {
      const newChecked = checkInverse ? !fieldValue : fieldValue;
      setChecked(newChecked);
    }
  }, [values, name, checkInverse]);

  // If the value is not initialized yet, you can prevent rendering the toggle

  return (
    <div
      className={cn(
        "cursor-pointer flex  justify-start  gap-x-2 ",
        description ? "items-start" : "items-center",
        flexReverse && "flex-col-reverse items-start"
      )}
    >
      {isLoading ? (
        <div className="w-12 h-8 bg-gray-300 rounded-full animate-pulse " />
      ) : (
        <Toggle
          id={name}
          size={size}
          disabled={disabled}
          className={cn(disabled && checked && "opacity-75")}
          checked={checked}
          onChange={(checked) => {
            const newChecked = checkInverse ? !checked : checked;
            setFieldValue(name, newChecked); // Update Formik's value
            setChecked(newChecked); // Update local state
            onChange && onChange(newChecked); // Trigger any custom onChange logic
          }}
          color="red"
        ></Toggle>
      )}
      {(title || description) && (
        <label htmlFor={name} className="cursor-pointer">
          {title && (
            <h3
              className={cn(
                "text-gray-700 font-medium text-base",
                description ? "leading-none mt-0" : ""
              )}
            >
              {title}
            </h3>
          )}
          {description && (
            <p className="text-gray-500 font-medium leading-none mt-1">
              {description}
            </p>
          )}
        </label>
      )}
    </div>
  );
}

export default ToggleField;
