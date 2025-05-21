import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import {
  withBodyValidation,
  withQueryValidation,
} from "@/backend/helpers/withValidation";
import {
  createAttendanceSchema,
  editAttendanceSchema,
} from "./_dto/mutate-attendee.dto";
import { getAttendees } from "./_service/getAttendees.service";
import { getAttendeesSchema } from "./_dto/get-attendees.dto";
import { createAttendance } from "./_service/addAttendance.service";
import { editAttendance } from "./_service/editAttendance.service";
import { deleteAttendanceSchema } from "./_dto/delete-attendee.dto";
import { deleteAttendance } from "./_service/deleteAttendance.service";

export const GET = withErrorHandling(
  withQueryValidation(getAttendees, getAttendeesSchema)
);

export const POST = withErrorHandling(
  withBodyValidation(createAttendance, createAttendanceSchema)
);

export const PATCH = withErrorHandling(
  withBodyValidation(editAttendance, editAttendanceSchema)
);

export const DELETE = withErrorHandling(
  withQueryValidation(deleteAttendance, deleteAttendanceSchema)
);
