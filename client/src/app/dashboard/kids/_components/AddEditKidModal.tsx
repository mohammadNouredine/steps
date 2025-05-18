import React from "react";
import CenteredModal from "../../../_components/popups/CenteredModal";
import { Form, Formik } from "formik";
import InputField from "@/components/fields/form/InputField";
import * as Yup from "yup";
import { Kid, Gender } from "@prisma/client";
import { useCreateKid } from "../../api-hookts/kids/useCreateKid";
import { useEditKid } from "../../api-hookts/kids/useEditKid";
import SelectField from "@/components/fields/form/SelectField";
import NumberField from "@/components/fields/form/NumberField";
import DateField from "@/components/fields/form/DateField";
import ImageUploader from "@/components/fields/form/ImageUploader";

function AddEditKidModal({
  isOpen,
  setIsOpen,
  editingKid,
  setEditingKid,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingKid?: Kid;
  setEditingKid: React.Dispatch<React.SetStateAction<Kid | undefined>>;
}) {
  const { mutate: createKid } = useCreateKid({
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  const { mutate: editKid } = useEditKid({
    onSuccess: () => {
      setIsOpen(false);
    },
    id: editingKid?.id || -1,
  });
  const isEditing = !!editingKid?.id;

  return (
    <CenteredModal
      onClose={() => {
        setEditingKid(undefined);
      }}
      title={isEditing ? "Edit Kid" : "Add Kid"}
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
    >
      <Formik
        validationSchema={Yup.object({
          firstName: Yup.string().required("First name is required"),
          lastName: Yup.string().required("Last name is required"),
          phoneNumber: Yup.string().nullable(),
          dateOfBirth: Yup.date().nullable(),
          gender: Yup.mixed<Gender>().oneOf(Object.values(Gender)).nullable(),
          loanBalance: Yup.number().nullable(),
          notes: Yup.string().nullable(),
        })}
        initialValues={{
          firstName: editingKid?.firstName || "",
          lastName: editingKid?.lastName || "",
          phoneNumber: editingKid?.phoneNumber || "",
          dateOfBirth: editingKid?.dateOfBirth || null,
          gender: editingKid?.gender || null,
          loanBalance: editingKid?.loanBalance || 0,
          notes: editingKid?.notes || "",
          image: editingKid?.image || "",
        }}
        onSubmit={(values) => {
          const formData = new FormData();
          formData.append("image", values.image);
          formData.append("firstName", values.firstName);
          formData.append("lastName", values.lastName);
          formData.append("phoneNumber", values.phoneNumber);
          formData.append(
            "dateOfBirth",
            values.dateOfBirth ? values.dateOfBirth.toISOString() : ""
          );
          formData.append("gender", values.gender ?? "");
          formData.append(
            "loanBalance",
            values.loanBalance != null ? values.loanBalance.toString() : ""
          );
          formData.append("notes", values.notes);

          if (isEditing) {
            editKid(formData);
          } else {
            createKid(formData);
          }
        }}
      >
        <Form>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <ImageUploader name="image" />
            </div>
            <InputField name="firstName" label="First Name" />
            <InputField name="lastName" label="Last Name" />
            <InputField name="phoneNumber" label="Phone Number" />
            <DateField name="dateOfBirth" label="Date of Birth" />
            <SelectField
              name="gender"
              label="Gender"
              data={[
                { value: Gender.MALE, label: "Male" },
                { value: Gender.FEMALE, label: "Female" },
              ]}
            />
            <NumberField name="loanBalance" label="Loan Balance" />
            <InputField name="notes" label="Notes" colSpan={2} />
          </div>
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
