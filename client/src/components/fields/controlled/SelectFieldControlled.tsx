import ToolTipWrapper from "@/components/common/ui/ToolTipWrapper";
import { colSpans } from "@/helpers/tailwindColSpan";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { CheckPicker, InputPicker } from "rsuite";
import { InputItemDataType } from "rsuite/esm/InputPicker";

export default function SelectFieldControlled({
  label,
  name,
  data,
  searchable = false,
  multiSelect = false,
  disabled = false,
  value,
  placeHolder,
  onChange,
  handleClean,
  toolTip,
  labelVisibleOn,
  noResultsMessage = "No results found",
  triggerOnChange = () => {},
  onCreate,
  normalizeArray = false,
  isLoading = false,
  isLoadingData = false,
  onClickAdd,
  colSpan = 1,
}: {
  label?: string;
  data: InputItemDataType<string | number>[];
  name?: string;
  searchable?: boolean;
  multiSelect?: boolean;
  disabled?: boolean;
  value: any;
  placeHolder?: string;
  onChange: (v: any) => void;
  handleClean?: () => void;
  labelVisibleOn?: string;
  noResultsMessage?: string;
  triggerOnChange?: (value: any) => void;
  onCreate?: (value: string) => void;
  normalizeArray?: boolean;
  isLoading?: boolean;
  isLoadingData?: boolean;
  onClickAdd?: (searchValue: string) => void;
  colSpan?: number;
  toolTip?: string;
}) {
  const [search, setSearch] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleChange = (value: any) => {
    if (normalizeArray) {
      onChange([value]);
    } else {
      onChange(value);
    }
    triggerOnChange && triggerOnChange(value);
  };

  return (
    <ToolTipWrapper toolTip={toolTip}>
      <div className={cn("relative min-w-[10rem]", colSpans[colSpan])}>
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
                  placeholder={placeHolder}
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
                  value={value}
                  onChange={(value) => {
                    onChange(value);
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
                    noResultsText: noResultsMessage,
                  }}
                />
              ) : (
                <InputPicker
                  creatable={!!onCreate}
                  onCreate={onCreate}
                  menuClassName=" !z-[100] "
                  disabled={disabled}
                  id={name}
                  placeholder={placeHolder}
                  name={name}
                  data={data}
                  searchable={searchable}
                  value={value}
                  onClean={() => {
                    if (!handleClean) {
                      handleChange(null);
                    } else {
                      handleClean();
                    }
                  }}
                  onChange={handleChange}
                  className="w-full"
                  locale={{
                    noResultsText: noResultsMessage,
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </ToolTipWrapper>
  );
}
