import * as yup from "yup";

export const sendTelegramReportSchema = yup.object().shape({
  date: yup.date().required("Date is required"),
  sendAttendance: yup.boolean().required(),
  sendLoans: yup.boolean().required(),
  sendPayments: yup.boolean().required(),
  sendPurchases: yup.boolean().required(),
});

export type SendTelegramReportDto = yup.InferType<
  typeof sendTelegramReportSchema
>;
