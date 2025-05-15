"use client";

import { ErrorMessage, useFormikContext } from "formik";
import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";
import { IconType } from "react-icons/lib";
import { Input, InputGroup } from "rsuite";
import { cn } from "@/utils/cn";
import { colSpans } from "@/helpers/tailwindColSpan";

export default function InputField({
  label,
  name,
  type,
  autoComplete,
  placeholder,
  disabled = false,
  labelVisibleOn,
  value,
  afterField,
  maxChars = 1000,
  Icon,
  addButtonClick,
  colSpan = 1,
}: {
  label?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  placeholder?: string;
  disabled?: boolean;
  labelVisibleOn?: string;
  value?: any;
  afterField?: string;
  maxChars?: number;
  Icon?: IconType;
  addButtonClick?: () => void;
  colSpan?: number;
}) {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: any;
  }>();

  return (
    <div className={colSpans[colSpan]}>
      {(label || Icon) && (
        <label
          htmlFor={name}
          className={cn(
            "mb-1 flex items-center justify-start text-sm font-medium capitalize leading-6 ",
            labelVisibleOn && `${labelVisibleOn}:hidden`
          )}
        >
          {Icon && <Icon className="mr-2 text-brand-300" />}
          {label}
        </label>
      )}
      <InputGroup inside>
        {/* <InputGroup.Addon>￥</InputGroup.Addon> */}
        <Input
          maxLength={maxChars}
          disabled={disabled}
          id={name}
          color="#000000"
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value ? value : values[name]}
          onChange={(value) => {
            if (value.length <= maxChars) {
              setFieldValue(name, value);
            }
          }}
          className="w-full"
        />

        {afterField && <InputGroup.Addon>{afterField}</InputGroup.Addon>}
        {addButtonClick && (
          <InputGroup.Addon>
            <button
              type="button"
              onClick={() => {
                addButtonClick();
              }}
            >
              add
            </button>
          </InputGroup.Addon>
        )}
      </InputGroup>

      <ErrorMessage
        name={name}
        className="text-red-500 text-xs"
        component="p"
      />
    </div>
  );
}
