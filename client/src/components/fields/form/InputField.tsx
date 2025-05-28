"use client";

import { ErrorMessage, useFormikContext } from "formik";
import {
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  useState,
} from "react";
import { IconType } from "react-icons/lib";
import { Input, InputGroup, Toggle } from "rsuite";
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
  as,
  addButtonClick,
  colSpan = 1,
  manageDirection = false,
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
  as?: React.ElementType;
  addButtonClick?: () => void;
  colSpan?: number;
  manageDirection?: boolean;
}) {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: any;
  }>();

  const [isRtl, setIsRtl] = useState(false);

  return (
    <div className={colSpans[colSpan]}>
      {(label || Icon) && (
        <div className="flex items-center gap-2 mb-1 ">
          <label
            htmlFor={name}
            className={cn(
              "flex items-center justify-start text-sm font-medium capitalize leading-6 ",
              labelVisibleOn && `${labelVisibleOn}:hidden`
            )}
          >
            {Icon && <Icon className="mr-2 text-brand-300" />}
            {label}
          </label>
          {manageDirection && (
            <Toggle onChange={() => setIsRtl(!isRtl)} size={"sm"}>
              <span className="text-sm text-gray-500">RTL</span>
            </Toggle>
          )}
        </div>
      )}
      <InputGroup inside>
        {/* <InputGroup.Addon>￥</InputGroup.Addon> */}
        <Input
          dir={isRtl ? "rtl" : "ltr"}
          maxLength={maxChars}
          disabled={disabled}
          id={name}
          color="#000000"
          name={name}
          type={type}
          as={as}
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
