import InputField from "@/components/fields/form/InputField";
import { cn } from "@/utils/cn";
import { FieldArray, useFormikContext } from "formik";
import React from "react";
import { BiPlus, BiTrash } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
function Attributes() {
  const { values } = useFormikContext<{
    [key: string]: {
      id: number;
      name: string;
      description: string;
    }[];
  }>();

  return (
    <div className="col-span-3 border border-gray-300 p-5 rounded-xl my-4 ">
      <FieldArray
        name="attributes"
        render={(arrayHelpers) => {
          const hasAttributes = values.attributes?.length > 0;
          return (
            <div className="space-y-2 grid grid-cols-2 ">
              <h2
                className={cn(
                  "text-gray-500 text-xl ",
                  hasAttributes && "col-span-2"
                )}
              >
                Attributes
              </h2>
              {values.attributes?.map((attribute, index) => {
                const isLast = index === values.attributes?.length - 1;
                return (
                  <div key={attribute.id} className="flex gap-x-2">
                    <InputField
                      name={`attributes[${index}].name`}
                      value={attribute.name}
                      label="Name"
                    />
                    <InputField
                      name={`attributes[${index}].description`}
                      value={attribute.description}
                      label="Description"
                    />
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                      className="border border-red-500 px-2 py-2 rounded-lg text-red-500 mt-7"
                    >
                      <BiTrash />
                    </button>
                    {isLast && (
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            id: uuidv4(),
                            name: "",
                            description: "",
                          })
                        }
                        className="border border-red-500 px-2 py-2 rounded-lg text-red-500 mt-7"
                      >
                        <BiPlus />
                      </button>
                    )}
                  </div>
                );
              })}
              {!hasAttributes && (
                <button
                  type="button"
                  onClick={() =>
                    arrayHelpers.push({
                      id: uuidv4(),
                      name: "",
                      description: "",
                    })
                  }
                  className="border border-red-500 px-2 py-2 rounded-lg text-red-500 col-span-1"
                >
                  Add Attribute
                </button>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

export default Attributes;
