import React from "react";
import { BillingMode, SubscriptionPlan } from "@prisma/client";
import CenteredModal from "@/app/_components/popups/CenteredModal";
import { Form, Formik } from "formik";
import { addPlanSchema } from "@/app/api/subscription-plans/_dto/add-edit-plan.dto.ts";
import { useCreateSubscriptionPlan } from "@/app/dashboard/api-hookts/subscriptions/subscription-plans/useCreateSubscriptionPlan";
import { useEditSubscriptionPlan } from "@/app/dashboard/api-hookts/subscriptions/subscription-plans/useEditSubscriptionPlan";
import InputField from "@/components/fields/form/InputField";
import NumberField from "@/components/fields/form/NumberField";
import Button from "@/components/common/ui/Button";
import RadioGroupField from "@/components/fields/form/RadioGroup";
function AddEditSubscriptionPlanModal({
  isOpen,
  setIsOpen,
  editingSubscriptionPlan,
  setEditingSubscriptionPlan,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingSubscriptionPlan?: SubscriptionPlan | null;
  setEditingSubscriptionPlan?: React.Dispatch<
    React.SetStateAction<SubscriptionPlan | null>
  >;
}) {
  const { mutate: createSubscriptionPlan, isPending: isCreating } =
    useCreateSubscriptionPlan({
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  const { mutate: editSubscriptionPlan, isPending: isEditing } =
    useEditSubscriptionPlan({
      onSuccess: () => {
        setIsOpen(false);
      },
      id: editingSubscriptionPlan?.id || -1,
    });
  return (
    <CenteredModal
      onClose={() => {
        setEditingSubscriptionPlan?.(null);
      }}
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
          billingMode:
            editingSubscriptionPlan?.billingMode || BillingMode.PREPAID,
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
            <NumberField name="price" label="Price" prefix="$" />
            <NumberField name="duration" label="Duration (days)" />
            <RadioGroupField
              name="billingMode"
              description="Billing mode"
              data={Object.values(BillingMode).map((v) => {
                return { value: v, label: v };
              })}
            />
            <Button
              type="button"
              buttonType="submit"
              className="mt-4"
              text={editingSubscriptionPlan ? "Edit" : "Add"}
              isLoading={isCreating || isEditing}
              disabled={isCreating || isEditing}
            />
          </Form>
        )}
      </Formik>
    </CenteredModal>
  );
}

export default AddEditSubscriptionPlanModal;
