import * as yup from "yup";
import { validateDateAndTransformToDate } from "../../_common/validation/date-validations";

export const addPurchaseSchema = yup.object().shape({
  kidId: yup.number().required("Kid ID is required"),
  attendanceId: yup.number().optional(),
  purchaseDate: validateDateAndTransformToDate.required(
    "PurchaseDate is required"
  ),
  note: yup.string().optional(),
  totalPrice: yup.number().required("Total Price is required"),
  paidAmount: yup.number().required("Paid Amount is required"),
});
export type AddPurchaseDto = yup.InferType<typeof addPurchaseSchema>;

export const editPurchaseSchema = addPurchaseSchema;
export type EditPurchaseDto = yup.InferType<typeof editPurchaseSchema>;
