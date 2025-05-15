import React from "react";
import CenteredModal from "../../../_components/popups/CenteredModal";
import { Form, Formik } from "formik";
import InputField from "@/components/fields/form/InputField";
import * as Yup from "yup";
import { useEditReview } from "../../api-hookts/review/useEditReview";
import { DashboardReview } from "../../_common/types/review";
import NumberField from "@/components/fields/form/NumberField";
import SelectField from "@/components/fields/form/SelectField";
function AddEditReviewModal({
  isOpen,
  setIsOpen,
  editingReview,
  setEditingReview,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingReview?: DashboardReview;
  setEditingReview: React.Dispatch<
    React.SetStateAction<DashboardReview | undefined>
  >;
}) {
  const { mutate: editReview, isPending } = useEditReview({
    onSuccess: () => {
      setIsOpen(false);
    },
    id: editingReview?.id || -1,
  });
  const isEditing = !!editingReview?.id;
  return (
    <CenteredModal
      onClose={() => {
        setEditingReview(undefined);
      }}
      title={isEditing ? "Edit Review" : "Create Review"}
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
    >
      <Formik
        validationSchema={Yup.object({
          review_amount: Yup.number()
            .required("Review amount is required")
            .max(5),
          description: Yup.string().optional(),
          name: Yup.string().optional(),
          type: Yup.string().required("Type is required"),
        })}
        initialValues={{
          review_amount: editingReview?.review_amount || 0,
          description: editingReview?.description || "",
          name: editingReview?.name || "",
          type: editingReview?.type || "website",
        }}
        onSubmit={(values) => {
          if (isEditing) {
            editReview(values);
          }
        }}
      >
        <Form>
          <SelectField
            name="type"
            label="Type"
            data={[
              {
                label: "Website",
                value: "website",
              },
              {
                label: "Products",
                value: "products",
              },
            ]}
          />
          <NumberField
            maxValue={5}
            name="review_amount"
            label="Review Amount"
          />
          <InputField name="name" label="Name" />
          <InputField name="description" label="Description" />
          <button
            disabled={isPending}
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

export default AddEditReviewModal;
