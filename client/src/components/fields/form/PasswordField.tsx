"use client";

import { ErrorMessage, useFormikContext } from "formik";
import { HTMLInputAutoCompleteAttribute, useState } from "react";
import { IconType } from "react-icons/lib";
import { Input, InputGroup } from "rsuite";
import { cn } from "@/utils/cn";
import { colSpans } from "@/helpers/tailwindColSpan";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({
  label,
  name,
  autoComplete,
  placeholder,
  disabled = false,
  labelVisibleOn,
  value,
  afterField,
  maxChars = 1000,
  Icon,
  colSpan = 1,
}: {
  label?: string;
  name: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  placeholder?: string;
  disabled?: boolean;
  labelVisibleOn?: string;
  value?: any;
  afterField?: string;
  maxChars?: number;
  Icon?: IconType;
  colSpan?: number;
}) {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: any;
  }>();

  const [showPassword, setShowPassword] = useState(false);

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
        </div>
      )}
      <InputGroup inside>
        <Input
          maxLength={maxChars}
          disabled={disabled}
          id={name}
          color="#000000"
          name={name}
          type={showPassword ? "text" : "password"}
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
        <InputGroup.Addon>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center justify-center w-6 h-6"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </InputGroup.Addon>
        {afterField && <InputGroup.Addon>{afterField}</InputGroup.Addon>}
      </InputGroup>

      <ErrorMessage
        name={name}
        className="text-red-500 text-xs"
        component="p"
      />
    </div>
  );
}
