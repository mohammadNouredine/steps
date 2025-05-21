import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { withBodyValidation } from "@/backend/helpers/withValidation";
import { toggleAttendee } from "../_service/toggleAttendee.service";
import { toggleAttendeeSchema } from "../_dto/mutate-attendee.dto";

//postfix with /toggle
export const POST = withErrorHandling(
  withBodyValidation(toggleAttendee, toggleAttendeeSchema)
);
