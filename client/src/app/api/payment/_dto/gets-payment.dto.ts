import * as yup from "yup";
import { dateValidation } from "../../_common/validation/date-validations";

export const getPaymentSchema = yup.object().shape({
  pageIndex: yup.number().required(),
  pageSize: yup.number().optional(),
  search: yup.string().optional(),
  startDate: dateValidation,
  endDate: dateValidation,
});

export type GetPaymentSchemaType = yup.InferType<typeof getPaymentSchema>;
