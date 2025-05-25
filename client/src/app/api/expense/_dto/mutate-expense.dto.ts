import * as yup from "yup";
import { validateDateAndTransformToDate } from "../../_common/validation/date-validations";

export const addExpenseSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().optional(),
  amount: yup.number().required(),
  paidAmount: yup.number().required(),
  date: validateDateAndTransformToDate.required("Date is required"),
});

export type AddExpenseSchemaType = yup.InferType<typeof addExpenseSchema>;

export const editExpenseSchema = addExpenseSchema.concat(
  yup.object().shape({
    id: yup.number().required(),
  })
);

export type EditExpenseSchemaType = yup.InferType<typeof editExpenseSchema>;

export const deleteExpenseSchema = yup.object().shape({
  id: yup.number().required(),
});
