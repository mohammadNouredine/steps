import React from "react";
import CenteredModal from "../../../_components/popups/CenteredModal";
import { Form, Formik } from "formik";
import InputField from "@/components/fields/form/InputField";
import * as Yup from "yup";
import { DashboardTag } from "../../_common/types/tag";
import { useCreateTag } from "../../api-hookts/tag/useCreateTag";
import { useEditTag } from "../../api-hookts/tag/useEditTag";
function AddEditKidModal({
  isOpen,
  setIsOpen,
  editingTag,
  setEditingTag,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingTag?: DashboardTag;
  setEditingTag: React.Dispatch<React.SetStateAction<DashboardTag | undefined>>;
}) {
  const { mutate: createTag } = useCreateTag({
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  const { mutate: editTag } = useEditTag({
    onSuccess: () => {
      setIsOpen(false);
    },
    id: editingTag?.id || -1,
  });
  const isEditing = !!editingTag?.id;
  return (
    <CenteredModal
      onClose={() => {
        setEditingTag(undefined);
      }}
      title={isEditing ? "Edit Tag" : "Create Tag"}
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
    >
      <Formik
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
        })}
        initialValues={{
          name: editingTag?.name || "",
        }}
        onSubmit={(values) => {
          if (isEditing) {
            editTag(values);
          } else {
            createTag(values);
          }
        }}
      >
        <Form>
          <InputField name="name" label="Name" />
          <button
            type="submit"
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md w-full"
          >
            {isEditing ? "Update" : "Create"}
          </button>
        </Form>
      </Formik>
    </CenteredModal>
  );
}

export default AddEditKidModal;
