import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { withAuth } from "@/backend/helpers/withAuth";
import { withRole } from "@/backend/helpers/withRole";
import { RoleEnum } from "@/types/permissions";
import {
  addContactMessage,
  getContactMessages,
} from "./_service/contact-message.service";
import {
  addContactMessageSchema,
  getContactMessageSchema,
} from "./contact-message.dto";
import {
  withBodyValidation,
  withQueryValidation,
} from "@/backend/helpers/withValidation";

export const POST = withErrorHandling(
  withBodyValidation(addContactMessage, addContactMessageSchema)
);

export const GET = withErrorHandling(
  withAuth(
    withRole({
      roles: [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN],
    })(withQueryValidation(getContactMessages, getContactMessageSchema))
  )
);
