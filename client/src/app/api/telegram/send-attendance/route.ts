import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { withAuth } from "@/backend/helpers/withAuth";
import { withBodyValidation } from "@/backend/helpers/withValidation";
import { sendTelegramReportSchema } from "./_dto/send-telegram-report.dto";
import { sendTelegramReportToBot } from "./send-telegram.service";

export const POST = withErrorHandling(
  withAuth(
    withBodyValidation(sendTelegramReportToBot, sendTelegramReportSchema)
  )
);
