import React from "react";
import CenteredModal from "../../../_components/popups/CenteredModal";
import { FieldArray, Form, Formik } from "formik";
import InputField from "@/components/fields/form/InputField";
import * as Yup from "yup";
import { useEditVariant } from "../../api-hookts/variant/useEditVariant";
import { useCreateVariant } from "../../api-hookts/variant/useCreateVariant";
import { DashboardVariant } from "../../_common/types/variants";
import { FiTrash2 } from "react-icons/fi";
function AddEditVariantModal({
  isOpen,
  setIsOpen,
  editingVariant,
  setEditingVariant,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingVariant?: DashboardVariant;
  setEditingVariant: React.Dispatch<
    React.SetStateAction<DashboardVariant | undefined>
  >;
}) {
  const { mutate: createVariant } = useCreateVariant({
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  const { mutate: editVariant } = useEditVariant({
    onSuccess: () => {
      setIsOpen(false);
    },
    id: editingVariant?.id || -1,
  });
  const isEditing = !!editingVariant?.id;
  return (
    <CenteredModal
      title={isEditing ? "Edit Variant" : "Create Variant"}
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
      onClose={() => {
        setEditingVariant(undefined);
      }}
    >
      <Formik
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
        })}
        initialValues={{
          name: editingVariant?.name || "",
          variantOptions: editingVariant?.variantOptions || [],
        }}
        onSubmit={(values) => {
          const variantOptions = values.variantOptions.map((variantOption) => ({
            name: variantOption.name,
            value:
              variantOption.value.length > 0
                ? variantOption.value
                : variantOption.name.split(" ").join("_"),
            id: variantOption.id,
          }));
          if (isEditing) {
            editVariant({
              ...values,
              variantOptions,
            });
          } else {
            createVariant({
              ...values,
              variantOptions,
            });
          }
        }}
      >
        {({ values }) => (
          <Form>
            <InputField name="name" label="Variant Name" />
            <div className="px-4 py-4 border border-gray-300 rounded-lg my-4">
              <h4>Variant Options</h4>
              <FieldArray
                name="variantOptions"
                render={(arrayHelpers) => (
                  <div className="space-y-4">
                    {values.variantOptions.map((variantOption, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-12 gap-x-4 gap-y-2"
                      >
                        <div className="col-span-11">
                          <InputField
                            name={`variantOptions.${index}.name`}
                            value={variantOption.name}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="border border-primary text-primary p-1 rounded-md w-full flex justify-center  items-center col-span-1"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push({ name: "", value: "" })}
                      className="border border-primary text-primary px-4 py-2 rounded-md w-full mt-4"
                    >
                      Add
                    </button>
                  </div>
                )}
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-primary text-white px-4 py-2 rounded-md w-full"
            >
              {isEditing ? "Update" : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </CenteredModal>
  );
}

export default AddEditVariantModal;
