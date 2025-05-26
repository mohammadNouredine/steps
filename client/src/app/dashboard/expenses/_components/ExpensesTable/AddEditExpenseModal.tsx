import React from "react";
import CenteredModal from "../../../../_components/popups/CenteredModal";
import { Form, Formik } from "formik";
import DateField from "@/components/fields/form/DateField";
import NumberField from "@/components/fields/form/NumberField";
import InputField from "@/components/fields/form/InputField";
import Button from "@/components/common/ui/Button";
import { DashboardExpenseType } from "@/app/dashboard/_common/types/expenses";
import { useAddExpense } from "@/app/dashboard/api-hookts/expenses/useAddExpense";
import { useEditExpense } from "@/app/dashboard/api-hookts/expenses/useEditExpense";
import {
  addExpenseSchema,
  AddExpenseSchemaType,
} from "@/app/api/expense/_dto/mutate-expense.dto";
interface ExpenseModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingExpense?: DashboardExpenseType;
  setEditingExpense: React.Dispatch<
    React.SetStateAction<DashboardExpenseType | undefined>
  >;
}

export default function AddEditExpenseModal({
  isOpen,
  setIsOpen,
  editingExpense,
  setEditingExpense,
}: ExpenseModalProps) {
  const { mutate: addExpense, isPending: isAdding } = useAddExpense({
    callBackOnSuccess: () => {
      setIsOpen(false);
    },
  });
  const { mutate: editExpense, isPending: isEditing } = useEditExpense({
    callBackOnSuccess: () => {
      setIsOpen(false);
    },
  });
  return (
    <CenteredModal
      onClose={() => {
        setEditingExpense(undefined);
      }}
      title="Expense"
      isOpenModal={isOpen}
      maxWidth="max-w-4xl"
      setIsOpenModal={setIsOpen}
    >
      <Formik
        validationSchema={addExpenseSchema}
        initialValues={{
          title: editingExpense?.title || "",
          description: editingExpense?.description || "",
          amount: editingExpense?.amount || 0,
          paidAmount: editingExpense?.paidAmount || 0,
          date: editingExpense?.date || new Date(),
        }}
        onSubmit={(values: AddExpenseSchemaType) => {
          if (editingExpense) {
            editExpense({
              ...values,
              id: editingExpense.id,
            });
          } else {
            addExpense(values);
          }
        }}
      >
        <Form>
          <div className="grid grid-cols-2 gap-x-2">
            <DateField name="date" label="Date" />
            <InputField name="title" label="Title" />
            <InputField name="description" label="Description" />
            <NumberField name="amount" label="Amount" />
            <NumberField name="paidAmount" label="Paid Amount" />
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
      </Formik>
    </CenteredModal>
  );
}
