"use client";

import { cn } from "@/utils/cn";
import { ErrorMessage, useFormikContext } from "formik";
import { HTMLInputAutoCompleteAttribute } from "react";
import { InputNumber } from "rsuite";

export default function NumberField({
  label,
  name,
  autoComplete,
  placeholder,
  disabled = false,
  labelVisibleOn,
  prefix = "",
  suffix = "",
  step = 1,
  maxChars,
  maxValue,
  minValue,
  value,
}: {
  label?: string;
  name: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  placeholder?: string;
  disabled?: boolean;
  labelVisibleOn?: string;
  afterField?: string;
  prefix?: string;
  suffix?: string;
  step?: number;
  maxChars?: number;
  maxValue?: number;
  minValue?: number;
  value?: any;
}) {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: any;
  }>();

  function toThousands(value: any) {
    return value
      ? `${value}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,")
      : value;
  }

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "mb-1 block text-sm font-medium capitalize leading-6",
            labelVisibleOn && `${labelVisibleOn}:hidden`
          )}
        >
          {label}
        </label>
      )}

      <InputNumber
        max={maxValue}
        min={minValue}
        maxLength={maxChars}
        disabled={disabled}
        formatter={(value) => `${prefix}${toThousands(value)}${suffix}`}
        id={name}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={0}
        value={value ? value : values[name]}
        onChange={(value) => {
          if (values[name] === 0) {
            setFieldValue(name, value);
          } else {
            setFieldValue(name, value);
          }
        }}
        onBlur={(e) => {
          setFieldValue(name, Number(e.target.value));
        }}
        className="w-full"
        step={step}
      />

      <ErrorMessage
        name={name}
        className="text-red-500 text-xs"
        component="p"
      />
    </div>
  );
}
