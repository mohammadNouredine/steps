import React from "react";
import CenteredModal from "../../../_components/popups/CenteredModal";
import { Form, Formik } from "formik";
import SelectField from "@/components/fields/form/SelectField";
import NumberField from "@/components/fields/form/NumberField";
import DateField from "@/components/fields/form/DateField";
import Button from "@/components/common/ui/Button";
import { DashboardSubscriptionType } from "../../_common/types/subscriptions";
import { useAddSubscription } from "../../api-hookts/subscriptions/useAddSubscription";
import { useEditSubscription } from "../../api-hookts/subscriptions/useEditSubscription";
import { addSubscriptionSchema } from "@/app/api/subscription/_dto/mutate-subscription.dto";
import { useGetAllKids } from "../../api-hookts/kids/useGetAllKids";
import { useGetAllSubscriptionPlans } from "../../api-hookts/subscriptions/subscription-plans/useGetAllSubscriptionPlans";
import { SubscriptionStatus } from "@prisma/client";

function AddEditKidModal({
  isOpen,
  setIsOpen,
  editingSubscription,
  setEditingSubscription,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingSubscription?: DashboardSubscriptionType;
  setEditingSubscription: React.Dispatch<
    React.SetStateAction<DashboardSubscriptionType | undefined>
  >;
}) {
  const { data: kids_data } = useGetAllKids();
  const kidsOptions = kids_data?.data.map((kid) => {
    return { value: kid.id, label: kid.firstName };
  });
  const { data: subscription_plans_data } = useGetAllSubscriptionPlans();
  const subscriptionPlansOptions = subscription_plans_data?.map((plan) => {
    return { value: plan.id, label: plan.name };
  });

  const { mutate: createSubscription, isPending: isCreatingLoading } =
    useAddSubscription({
      callBackOnSuccess: () => {
        setIsOpen(false);
      },
    });
  const { mutate: editSubscription, isPending: isEditingLoading } =
    useEditSubscription({
      callBackOnSuccess: () => {
        setIsOpen(false);
      },
    });
  const isEditing = !!editingSubscription?.id;

  return (
    <CenteredModal
      onClose={() => {
        setEditingSubscription(undefined);
      }}
      title={isEditing ? "Edit Kid" : "Add Kid"}
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
    >
      <Formik
        validationSchema={addSubscriptionSchema}
        initialValues={{
          kidId: editingSubscription?.kidId || -1,
          planId: editingSubscription?.planId || -1,
          startDate: editingSubscription?.startDate || undefined,
          endDate: editingSubscription?.endDate || undefined,
          amountPaid: editingSubscription?.amountPaid || 0,
          discountPercentage: editingSubscription?.discountPercentage || 0,
          status: editingSubscription?.status || undefined,
        }}
        onSubmit={(values) => {
          if (isEditing) {
            editSubscription({
              ...values,
              id: editingSubscription?.id || -1,
            });
          } else {
            createSubscription(values);
          }
        }}
      >
        <Form>
          <div className="grid grid-cols-2 gap-4">
            <SelectField name="kidId" label="Kid" data={kidsOptions || []} />
            <SelectField
              name="planId"
              label="Plan"
              data={subscriptionPlansOptions || []}
            />
            <DateField name="startDate" label="Start Date" />
            <DateField name="endDate" label="End Date" />
            <NumberField name="amountPaid" label="Amount Paid" />
            <NumberField name="discountPercentage" label="Discount %" />
            {isEditing && (
              <SelectField
                name="status"
                label="Status"
                data={Object.values(SubscriptionStatus).map((v) => {
                  return { value: v, label: v };
                })}
              />
            )}
          </div>
          <Button
            type="button"
            buttonType="submit"
            text={isEditing ? "Update" : "Create"}
            className="mt-4"
            loadingText="Saving..."
            isLoading={isEditingLoading || isCreatingLoading}
          />
        </Form>
      </Formik>
    </CenteredModal>
  );
}

export default AddEditKidModal;
