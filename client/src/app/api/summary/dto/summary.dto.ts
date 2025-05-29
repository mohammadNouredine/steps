import * as yup from "yup";
import { dateValidation } from "../../_common/validation/date-validations";

export const getSummarySchema = yup.object({
  startDate: dateValidation.optional(),
  endDate: dateValidation.optional(),
  isPaymentPending: yup.boolean().optional(),
});

export type GetSummarySchemaType = yup.InferType<typeof getSummarySchema>;
export type SummaryResponse = {
  expenses: {
    totalAmount: number;
    totalPaid: number;
    totalDue: number;
  };
  payments: {
    totalPaid: number;
  };
  loans: {
    totalLoanBalance: number;
  };
  purchasedItems: {
    totalPrice: number;
    totalPaidAmount: number;
  };
};
