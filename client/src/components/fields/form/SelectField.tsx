import { colSpans } from "@/helpers/tailwindColSpan";
import { cn } from "@/utils/cn";
import { ErrorMessage, useFormikContext } from "formik";
import { useState } from "react";
import { CheckPicker, InputPicker } from "rsuite";
import { InputItemDataType } from "rsuite/esm/InputPicker";

export default function SelectField({
  label,
  name,
  data,
  searchable = false,
  multiSelect = false,
  disabled = false,
  value,
  labelVisibleOn,
  noResultsMessage = "No results found",
  triggerOnChange = () => {},
  normalizeArray = false,
  isLoading = false,
  isLoadingData = false,
  onClickAdd,
  colSpan = 1,
}: {
  label?: string;
  data: InputItemDataType<string | number>[];
  name: string;
  searchable?: boolean;
  multiSelect?: boolean;
  disabled?: boolean;
  value?: any;
  labelVisibleOn?: string;
  noResultsMessage?: string;
  triggerOnChange?: (value: any) => void;
  normalizeArray?: boolean;
  isLoading?: boolean;
  isLoadingData?: boolean;
  onClickAdd?: (searchValue: string) => void;
  colSpan?: number;
}) {
  const [search, setSearch] = useState("");

  const [noResults, setNoResults] = useState(false);

  // Filter data based on search to determine if results are empty

  const { values, setFieldValue } = useFormikContext<{ [key: string]: any }>();
  const handleChange = (value: any) => {
    if (normalizeArray) {
      setFieldValue(name, [value]);
    } else {
      setFieldValue(name, value);
    }
    triggerOnChange && triggerOnChange(value);
  };
  return (
    <div className={cn("relative", colSpans[colSpan])}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "mb-1 block text-sm font-medium leading-6 text-black",
            labelVisibleOn && `${labelVisibleOn}:hidden`
          )}
        >
          {label}
        </label>
      )}
      <div className="">
        {isLoading ? (
          <div>
            <div className="w-full h-9 rounded-md bg-gray-300 animate-pulse " />
          </div>
        ) : (
          <>
            {multiSelect ? (
              <CheckPicker
                menuClassName=" !z-[100] !w-10 "
                disabled={disabled}
                id={name}
                name={name}
                loading={isLoadingData}
                data={data}
                onSearch={(searchText) => {
                  setSearch(searchText);
                  const isPresent = data.find(
                    (item) => item.value === searchText
                  );
                  if (isPresent) {
                    setNoResults(false);
                  } else {
                    if (searchText.length === 0) {
                      setNoResults(false);
                    } else {
                      setNoResults(true);
                    }
                  }
                }}
                searchable={searchable}
                value={value ? value : values[name]}
                onChange={(value) => {
                  setFieldValue(name, value);
                  triggerOnChange && triggerOnChange(value);
                }}
                renderMenu={(menu) => {
                  return (
                    <div className="">
                      {menu}
                      {onClickAdd && noResults && (
                        <div className="px-2 w-full">
                          <button
                            type="button"
                            onClick={() => {
                              onClickAdd?.(search);
                            }}
                            className="px-4 py-2 w-full border-primary border rounded-lg text-primary"
                          >
                            Add {search}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }}
                className="w-full"
                locale={{
                  noResultsText: noResultsMessage, // Customize this message
                }}
              />
            ) : (
              <InputPicker
                menuClassName=" !z-[100] "
                disabled={disabled}
                id={name}
                name={name}
                data={data}
                searchable={searchable}
                value={
                  value
                    ? value
                    : normalizeArray
                    ? values[name][0]
                    : values[name]
                }
                onChange={handleChange}
                className="w-full"
                locale={{
                  noResultsText: noResultsMessage, // Customize this message
                }}
              />
            )}
          </>
        )}
      </div>

      <ErrorMessage
        name={name}
        className="text-brand-500 text-xs"
        component="p"
      />
    </div>
  );
}
