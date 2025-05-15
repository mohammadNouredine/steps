import { Fragment, useState } from "react";
import { Combobox, ComboboxButton, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { useFormikContext } from "formik";
import ReactCountryFlag from "react-country-flag";

import phoneCodes from "./phoneCodes";
import { cn } from "@/utils/cn";

export function SelectPhoneCodeField({
  tabIndex,
  label,
  disabled,
  name,
}: {
  tabIndex: number;
  label?: string;
  disabled?: boolean;
  name: string;
}) {
  const [query, setQuery] = useState("");

  const { setFieldValue, values } = useFormikContext<any>();

  const filteredData =
    query === ""
      ? phoneCodes
      : phoneCodes.filter((item) =>
          item.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="flex flex-col w-full h-full">
      {label && (
        <label
          className={cn("mb-1 block text-sm font-medium capitalize leading-6")}
        >
          {label}
        </label>
      )}
      <Combobox
        value={values.phoneCode}
        onChange={(val) => setFieldValue(name, val.value)}
        name={name}
        disabled={disabled}
      >
        <div className="relative ">
          <ComboboxButton
            className={`relative w-full border-gray-300 hover:border-primary focus:border-brand-600 border overflow-hidden rounded-md shadow-sm text-left sm:text-sm`}
          >
            <ReactCountryFlag
              className={`absolute top-2.5 left-2.5 flex items-center`}
              countryCode={
                phoneCodes.find((i) => i.value === values.phoneCode)?.code || ""
              }
              svg
            />
            <Combobox.Input
              tabIndex={tabIndex}
              className={`w-full rounded-md border-none py-[7px] pl-8 pr-10 text-sm leading-5 text-gray-900 focus:outline-brand-600/20
                 ${
                   disabled
                     ? "cursor-not-allowed bg-gray-50"
                     : "cursor-pointer bg-white"
                 }`}
              // // @ts-ignore
              // displayValue=""
              onChange={(event) => setQuery(event.target.value)}
              autoFocus={false}
            />
            <div className="absolute top-3 right-0 pr-2">
              <FaChevronDown
                className={`h-3.5 w-3.5 text-gray-400 ${
                  disabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                aria-hidden="true"
              />
            </div>
          </ComboboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 z-[999999999999999999] max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none focus:ring-0 sm:text-sm">
              {filteredData.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData.map((item) => (
                  <Combobox.Option
                    key={item.label}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.value}
                        </span>
                        <ReactCountryFlag
                          className={`absolute top-3 left-4 flex items-center ${
                            active ? "text-white" : "text-blue-500"
                          }`}
                          countryCode={
                            phoneCodes.find((p) => p?.code === item?.code)
                              ?.code || ""
                          }
                          svg
                        />
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
