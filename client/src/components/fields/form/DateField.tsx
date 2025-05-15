import { ErrorMessage, useFormikContext } from "formik";
import React from "react";
import { DatePicker } from "rsuite";
import dayjs from "dayjs";
export default function DateField({
  label,
  name,
  datePickerProps,
}: {
  label?: string;
  name: string;
  datePickerProps?: React.ComponentProps<typeof DatePicker>;
}) {
  //use formik context

  const { values, setFieldValue } = useFormikContext<{
    [key: string]: any;
  }>();
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium leading-6 text-black"
        >
          {label}
        </label>
      )}

      <DatePicker
        value={values[name] ? new Date(values[name]) : undefined}
        onChange={(dateValue) => {
          const formattedDate = dateValue
            ? dayjs(dateValue).format("YYYY-MM-DD")
            : "";
          setFieldValue(name, formattedDate);
        }}
        menuClassName="z-[9999]"
        format="yyyy-MM-dd"
        {...datePickerProps}
      />
      <ErrorMessage
        name={name}
        className="text-brand-500 text-xs"
        component="p"
      />
    </div>
  );
}
