import * as yup from "yup";
import { dateValidation } from "../../_common/validation/date-validations";

export const getExpenseSchema = yup.object().shape({
  pageIndex: yup.number().required(),
  pageSize: yup.number().optional(),
  search: yup.string().optional(),
  startDate: dateValidation,
  endDate: dateValidation,
  isPaymentPending: yup.boolean().optional(),
});

export type GetExpenseSchemaType = yup.InferType<typeof getExpenseSchema>;
