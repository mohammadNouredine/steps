import React from "react";
import CenteredModal from "../../../../_components/popups/CenteredModal";
import { Form, Formik } from "formik";
import DateField from "@/components/fields/form/DateField";
import NumberField from "@/components/fields/form/NumberField";
import InputField from "@/components/fields/form/InputField";
import Button from "@/components/common/ui/Button";
import { DashboardPaymentType } from "@/app/dashboard/_common/types/payments";
import {
  addPaymentSchema,
  AddPaymentSchemaType,
} from "@/app/api/payment/_dto/mutate-payment.dto";
import { formatDateToDashes } from "@/helpers/formatDate";
import { useAddPayment } from "@/app/dashboard/api-hookts/payments/useAddPayment";
import { useEditPayment } from "@/app/dashboard/api-hookts/payments/useEditPayment";
import { useGetAllKids } from "@/app/dashboard/api-hookts/kids/useGetAllKids";
import SelectField from "@/components/fields/form/SelectField";
interface PaymentModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingPayment?: DashboardPaymentType;
  setEditingPayment: React.Dispatch<
    React.SetStateAction<DashboardPaymentType | undefined>
  >;
}

export default function AddEditPaymentModal({
  isOpen,
  setIsOpen,
  editingPayment,
  setEditingPayment,
}: PaymentModalProps) {
  const { mutate: addPayment, isPending: isAdding } = useAddPayment({
    callBackOnSuccess: () => {
      setIsOpen(false);
    },
  });
  const { mutate: editPayment, isPending: isEditing } = useEditPayment({
    callBackOnSuccess: () => {
      setIsOpen(false);
    },
  });
  const { data: kids_data } = useGetAllKids();
  const kidsOptions = kids_data?.data.map((kid) => {
    return {
      value: kid.id,
      label: kid.firstName,
      loanBalance: kid.loanBalance,
    };
  });

  return (
    <CenteredModal
      onClose={() => {
        setEditingPayment(undefined);
      }}
      title="Payment"
      isOpenModal={isOpen}
      maxWidth="max-w-4xl"
      setIsOpenModal={setIsOpen}
    >
      <Formik<AddPaymentSchemaType>
        validationSchema={addPaymentSchema}
        initialValues={{
          amount: editingPayment?.amount || 0,
          paymentDate: editingPayment?.paymentDate
            ? formatDateToDashes(editingPayment?.paymentDate)
            : formatDateToDashes(new Date()),
          note: editingPayment?.note || "",
          kidId: editingPayment?.kidId || -1,
        }}
        onSubmit={(values: AddPaymentSchemaType) => {
          if (editingPayment) {
            editPayment({
              ...values,
              id: editingPayment.id,
            });
          } else {
            addPayment(values);
          }
        }}
      >
        {({ values }) => {
          const selectedKid = kidsOptions?.find(
            (kid) => kid.value === values.kidId
          );
          return (
            <Form>
              <div className="md:grid md:grid-cols-2 gap-x-2">
                <SelectField
                  extraLabel={
                    selectedKid
                      ? "( Loans: " + selectedKid?.loanBalance + "$ )"
                      : undefined
                  }
                  extraLabelClassName="text-green text-xs mx-1"
                  name="kidId"
                  label="Kid"
                  data={kidsOptions || []}
                />
                <NumberField name="amount" label="Amount" />
                <DateField name="paymentDate" label="Date" />
                <InputField name="note" label="Note" />
              </div>

              <Button
                className="mt-4"
                buttonType="submit"
                type="button"
                text="Submit"
                isLoading={isAdding || isEditing}
                loadingText="Submitting..."
              />
            </Form>
          );
        }}
      </Formik>
    </CenteredModal>
  );
}
