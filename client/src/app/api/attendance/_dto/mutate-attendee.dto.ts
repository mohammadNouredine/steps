import * as yup from "yup";

//------TOGGLE
export const toggleAttendeeSchema = yup.object().shape({
  date: yup.date().required("Date is required"),
  kidId: yup.number().required("Kid ID is required"),
});
export type ToggleAttendeeDto = yup.InferType<typeof toggleAttendeeSchema>;

//------CREATE
export const createAttendanceSchema = yup.object().shape({
  date: yup.date().required("Date is required"),
  kidId: yup.string().required("Kid ID is required"),
  extraCharge: yup.number().optional(),
  note: yup.string().optional(),
});
export type CreateAttendanceDto = yup.InferType<typeof createAttendanceSchema>;

//------EDIT
export const editAttendanceSchema = createAttendanceSchema;
export type EditAttendanceDto = yup.InferType<typeof editAttendanceSchema>;
