import * as yup from "yup";
import { dateValidation } from "@/app/api/_common/validation/date-validations";

export const getAttendeesSchema = yup.object().shape({
  date: dateValidation,
  kidId: yup.number().optional(),
});
export type GetAttendeesSchemaType = yup.InferType<typeof getAttendeesSchema>;
