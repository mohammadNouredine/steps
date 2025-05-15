import CenteredModal from "@/app/_components/popups/CenteredModal";
import { useAddMedia } from "@/app/dashboard/api-hookts/media/useAddMedia";
import ImageUploader from "@/components/fields/form/ImageUploader";
import InputField from "@/components/fields/form/InputField";
import SelectField from "@/components/fields/form/SelectField";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
function AddMediaModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { mutate: addMedia } = useAddMedia({
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  return (
    <CenteredModal
      title="Add Media"
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
    >
      <Formik
        initialValues={{
          name: "",
          file: null,
          type: "image",
        }}
        onSubmit={(values) => {
          if (values.file) {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("file", values.file);
            formData.append("type", values.type);
            addMedia(formData);
          }
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          file: Yup.mixed().required("File is required"),
        })}
      >
        <Form>
          <ImageUploader name="file" />
          <InputField name="name" label="Name" />
          <SelectField
            name="type"
            label="Type"
            data={[
              { value: "image", label: "Image" },
              { value: "video", label: "Video" },
            ]}
          />

          <button
            type="submit"
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md w-full"
          >
            Add
          </button>
        </Form>
      </Formik>
    </CenteredModal>
  );
}

export default AddMediaModal;
