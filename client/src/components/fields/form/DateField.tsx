import { ErrorMessage, useFormikContext } from "formik";
import React from "react";
import { DatePicker } from "rsuite";
import { formatDate } from "@/helpers/formatDate";

export default function DateField({
  label,
  name,
  datePickerProps,
  disabled = false,
  showTime = false,
  placement = "auto",
}: {
  label?: string;
  name: string;
  datePickerProps?: React.ComponentProps<typeof DatePicker>;
  disabled?: boolean;
  showTime?: boolean;
  placement?:
    | "auto"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "autoVertical"
    | "autoVerticalStart"
    | "autoVerticalEnd"
    | "autoHorizontal"
    | "autoHorizontalStart"
    | "autoHorizontalEnd";
}) {
  const { values, setFieldValue } = useFormikContext<{ [key: string]: any }>();

  // Format string for the picker and for storing value
  const format = showTime ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium leading-6 text-black"
        >
          {label}
        </label>
      )}

      <DatePicker
        placement={placement}
        disabled={disabled}
        value={values[name] ? new Date(values[name]) : undefined}
        onChange={(dateValue) => {
          if (!dateValue) {
            setFieldValue(name, "");
            return;
          }
          // Format with or without time depending on showTime
          const formattedDate = formatDate(dateValue);
          if (showTime) {
            setFieldValue(name, dateValue);
          } else {
            setFieldValue(name, formattedDate);
          }
        }}
        className="w-full z-[9999]"
        //change popup class name

        menuClassName="!z-[9999]"
        format={format}
        ranges={[]} // disables presets (optional)
        showMeridian={false}
        {...(showTime
          ? { showHour: true, showMinute: true, showSecond: true }
          : {})}
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
