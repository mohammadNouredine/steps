import * as yup from "yup";
import { dateValidation } from "../../_common/validation/date-validations";
import { DashboardPaymentType } from "@/app/dashboard/_common/types/payments";
import { Pagination } from "@/app/dashboard/_common/types/meta";

export const getPaymentSchema = yup.object().shape({
  pageIndex: yup.number().required(),
  pageSize: yup.number().optional(),
  search: yup.string().optional(),
  startDate: dateValidation,
  endDate: dateValidation,
});

export type GetPaymentSchemaType = yup.InferType<typeof getPaymentSchema>;

export type ReturnedPaymentResponse = {
  data: DashboardPaymentType[];
  summary: {
    totalPayments: number;
  };
  pagination: Pagination;
};
