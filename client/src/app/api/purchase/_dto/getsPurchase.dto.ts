import * as yup from "yup";

export const getPurchasesSchema = yup.object().shape({
  search: yup.string().optional(),
  pageIndex: yup.number().required(),
  pageSize: yup.number().optional(),
  kidId: yup.number().optional(),
  date: yup.string().optional(),
});
export type GetPurchasesSchemaType = yup.InferType<typeof getPurchasesSchema>;
