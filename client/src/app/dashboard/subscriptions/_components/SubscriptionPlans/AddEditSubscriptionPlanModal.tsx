import React from "react";
import { SubscriptionPlan } from "@prisma/client";
import CenteredModal from "@/app/_components/popups/CenteredModal";
import { Form, Formik } from "formik";
import { addPlanSchema } from "@/app/api/subscription-plans/_dto/add-edit-plan.dto.ts";
import { useCreateSubscriptionPlan } from "@/app/dashboard/api-hookts/subscriptions/subscription-plans/useCreateSubscriptionPlan";
import { useEditSubscriptionPlan } from "@/app/dashboard/api-hookts/subscriptions/subscription-plans/useEditSubscriptionPlan";
import InputField from "@/components/fields/form/InputField";
import NumberField from "@/components/fields/form/NumberField";
import Button from "@/components/common/ui/Button";
function AddEditSubscriptionPlanModal({
  isOpen,
  setIsOpen,
  editingSubscriptionPlan,
  setEditingSubscriptionPlan,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingSubscriptionPlan: SubscriptionPlan | null;
  setEditingSubscriptionPlan: React.Dispatch<
    React.SetStateAction<SubscriptionPlan | null>
  >;
}) {
  const { mutate: createSubscriptionPlan } = useCreateSubscriptionPlan({
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  const { mutate: editSubscriptionPlan } = useEditSubscriptionPlan({
    onSuccess: () => {
      setIsOpen(false);
    },
    id: editingSubscriptionPlan?.id || -1,
  });
  return (
    <CenteredModal
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
      title={
        editingSubscriptionPlan
          ? "Edit Subscription Plan"
          : "Add Subscription Plan"
      }
    >
      <Formik
        initialValues={{
          name: editingSubscriptionPlan?.name || "",
          description: editingSubscriptionPlan?.description || "",
          price: editingSubscriptionPlan?.price || 0,
          duration: editingSubscriptionPlan?.duration || 0,
        }}
        validationSchema={addPlanSchema}
        onSubmit={(values) => {
          if (editingSubscriptionPlan) {
            editSubscriptionPlan(values);
          } else {
            createSubscriptionPlan(values);
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <InputField name="name" label="Name" />
            <InputField name="description" label="Description" />
            <NumberField name="price" label="Price" />
            <NumberField name="duration" label="Duration (days)" />
            <Button
              type="button"
              buttonType="submit"
              className="mt-4"
              text={editingSubscriptionPlan ? "Edit" : "Add"}
            />
          </Form>
        )}
      </Formik>
    </CenteredModal>
  );
}

export default AddEditSubscriptionPlanModal;
