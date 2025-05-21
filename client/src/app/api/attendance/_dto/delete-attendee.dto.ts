import * as yup from "yup";

export const deleteAttendanceSchema = yup.object().shape({
  attendanceId: yup.number().required("Attendance ID is required"),
});
export type DeleteAttendanceDto = yup.InferType<typeof deleteAttendanceSchema>;
