import * as yup from "yup";

export const addPaymentSchema = yup.object().shape({
  kidId: yup.number().required(),
  amount: yup.number().required(),
  paymentDate: yup.date().required(),
  note: yup.string().optional(),
});

export type AddPaymentSchemaType = yup.InferType<typeof addPaymentSchema>;

export const editPaymentSchema = addPaymentSchema.concat(
  yup.object({
    id: yup.number().required(),
  })
);

export type EditPaymentSchemaType = yup.InferType<typeof editPaymentSchema>;

export const deletePaymentSchema = yup.object().shape({
  id: yup.number().required(),
});
