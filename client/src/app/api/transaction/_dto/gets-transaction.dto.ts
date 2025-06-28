import * as yup from "yup";
import { dateValidation } from "../../_common/validation/date-validations";
import { DashboardTransactionType } from "@/app/dashboard/_common/types/transactions";
import { Pagination } from "@/app/dashboard/_common/types/meta";

export const getTransactionSchema = yup.object().shape({
  pageIndex: yup.number().required(),
  pageSize: yup.number().optional(),
  search: yup.string().optional(),
  startDate: dateValidation,
  endDate: dateValidation,
  kidId: yup.number().optional(),
  userId: yup.number().optional(),
});

export type GetTransactionSchemaType = yup.InferType<
  typeof getTransactionSchema
>;

export type ReturnedTransactionResponse = {
  data: DashboardTransactionType[];
  summary: {
    totalTransactions: number;
    totalExchangeAmount: number;
    totalPositiveExchange: number;
    totalNegativeExchange: number;
  };
  pagination: Pagination;
};
