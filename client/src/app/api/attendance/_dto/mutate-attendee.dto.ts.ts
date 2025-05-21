import * as yup from "yup";
import { validateDateAndTransformToDate } from "@/app/api/_common/validation/date-validations";

//------TOGGLE
export const toggleAttendeeSchema = yup.object().shape({
  date: validateDateAndTransformToDate.required("Date is required"),
  kidId: yup.string().required("Kid ID is required"),
});
export type ToggleAttendeeDto = yup.InferType<typeof toggleAttendeeSchema>;

//------CREATE
export const createAttendanceSchema = yup.object().shape({
  date: validateDateAndTransformToDate.required("Date is required"),
  kidId: yup.string().required("Kid ID is required"),
  extraCharge: yup.number().optional(),
  note: yup.string().optional(),
});
export type CreateAttendanceDto = yup.InferType<typeof createAttendanceSchema>;

//------EDIT
export const editAttendanceSchema = createAttendanceSchema;
export type EditAttendanceDto = yup.InferType<typeof editAttendanceSchema>;
