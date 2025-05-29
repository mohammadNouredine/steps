import * as yup from "yup";
import { dateValidation } from "../../_common/validation/date-validations";
import { DashboardExpenseType } from "@/app/dashboard/_common/types/expenses";
import { Pagination } from "@/app/dashboard/_common/types/meta";

export const getExpenseSchema = yup.object().shape({
  pageIndex: yup.number().required(),
  pageSize: yup.number().optional(),
  search: yup.string().optional(),
  startDate: dateValidation,
  endDate: dateValidation,
  isPaymentPending: yup.boolean().optional(),
});

export type GetExpenseSchemaType = yup.InferType<typeof getExpenseSchema>;

export type ReturnedExpenseResponse = {
  data: DashboardExpenseType[];
  summary: {
    totalAmount: number;
    totalPaid: number;
    totalDue: number;
  };
  pagination: Pagination;
};
