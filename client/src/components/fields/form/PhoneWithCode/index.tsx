import React from "react";
import { SelectPhoneCodeField } from "./SelectPhoneCode";
import InputField from "../InputField";
import { cn } from "@/utils/cn";

function PhoneWithCode({
  codeName,
  phoneName,
  phonePlaceholder,
  label,
}: {
  codeName: string;
  phoneName: string;
  phonePlaceholder: string;
  label?: string;
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={codeName}
          className={cn(
            "mb-1 flex items-center justify-start text-sm font-medium capitalize leading-6 "
          )}
        >
          {label}
        </label>
      )}
      <div className="grid grid-cols-12 gap-x-2 col-span-12 lg:col-span-3">
        <div className="col-span-4">
          <SelectPhoneCodeField tabIndex={1} name={codeName} />
        </div>
        <div className="col-span-8">
          <InputField
            name={phoneName}
            type="tel"
            placeholder={phonePlaceholder}
          />
        </div>
      </div>
    </div>
  );
}

export default PhoneWithCode;
