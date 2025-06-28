import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CenteredModal from "../../../_components/popups/CenteredModal";
import { Kid } from "@prisma/client";
import { useCreateTransaction } from "../../api-hookts/transactions/useCreateTransaction";
import NumberField from "@/components/fields/form/NumberField";
import InputField from "@/components/fields/form/InputField";
import Button from "@/components/common/ui/Button";

interface UpdateLoanModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  kid: Kid;
}

const validationSchema = Yup.object({
  newLoanBalance: Yup.number()
    .required("New loan balance is required")
    .min(0, "Loan balance cannot be negative")
    .typeError("Loan balance must be a number"),
  note: Yup.string().optional(),
});

interface FormValues {
  newLoanBalance: number;
  note: string;
}

export default function UpdateLoanModal({
  isOpen,
  setIsOpen,
  kid,
}: UpdateLoanModalProps) {
  const { mutate: createTransaction, isPending } = useCreateTransaction({
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  const initialValues: FormValues = {
    newLoanBalance: Number(kid.loanBalance) || 0,
    note: "",
  };

  const handleSubmit = (values: FormValues) => {
    createTransaction({
      kidId: kid.id,
      newLoanBalance: values.newLoanBalance,
      note: values.note || undefined,
    });
  };

  return (
    <CenteredModal
      onClose={() => {
        setIsOpen(false);
      }}
      title={`تصحيح الدّين - ${kid.firstName} ${kid.lastName}`}
      isOpenModal={isOpen}
      maxWidth="max-w-md"
      setIsOpenModal={setIsOpen}
    >
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>الرصيد الحالي:</strong> ${kid.loanBalance}
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="space-y-4">
              <NumberField name="newLoanBalance" label="الرصيد الجديد" />

              <InputField
                name="note"
                label="ملاحظة (اختياري)"
                as="textarea"
                placeholder="أدخل ملاحظة حول التغيير"
              />

              {/* Preview of change */}
              {values.newLoanBalance !== Number(kid.loanBalance) && (
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>التغيير:</strong>{" "}
                    {values.newLoanBalance > Number(kid.loanBalance) ? "+" : ""}
                    $
                    {(values.newLoanBalance - Number(kid.loanBalance)).toFixed(
                      2
                    )}
                  </p>
                </div>
              )}

              <Button
                type="button"
                buttonType="submit"
                text="تحديث الرصيد"
                className="mt-4"
                loadingText="جاري التحديث..."
                isLoading={isPending}
                disabled={values.newLoanBalance === Number(kid.loanBalance)}
              />
            </div>
          </Form>
        )}
      </Formik>
    </CenteredModal>
  );
}
