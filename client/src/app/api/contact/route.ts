import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
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
  withQueryValidation(getContactMessages, getContactMessageSchema)
);
