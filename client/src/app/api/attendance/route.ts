import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import {
  withBodyValidation,
  withQueryValidation,
} from "@/backend/helpers/withValidation";
import {
  createAttendanceSchema,
  editAttendanceSchema,
} from "./_dto/mutate-attendee.dto.ts.js";
import { getAttendees } from "./_service/getAttendees.service.js";
import { getAttendeesSchema } from "./_dto/get-attendees.dto.js";
import { createAttendance } from "./_service/addAttendance.service.js";
import { editAttendance } from "./_service/editAttendance.service.js";

export const GET = withErrorHandling(
  withQueryValidation(getAttendees, getAttendeesSchema)
);

export const POST = withErrorHandling(
  withBodyValidation(createAttendance, createAttendanceSchema)
);

export const PATCH = withErrorHandling(
  withBodyValidation(editAttendance, editAttendanceSchema)
);
