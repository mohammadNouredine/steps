import * as yup from "yup";

export const addTransactionSchema = yup.object().shape({
  kidId: yup.number().required(),
  newLoanBalance: yup.number().required(),
  note: yup.string().optional(),
});

export type AddTransactionSchemaType = yup.InferType<
  typeof addTransactionSchema
>;

export const editTransactionSchema = addTransactionSchema.concat(
  yup.object().shape({
    id: yup.number().required(),
  })
);

export type EditTransactionSchemaType = yup.InferType<
  typeof editTransactionSchema
>;

export const deleteTransactionSchema = yup.object().shape({
  id: yup.number().required(),
});
