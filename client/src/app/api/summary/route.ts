import { withAuth } from "@/backend/helpers/withAuth";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { withQueryValidation } from "@/backend/helpers/withValidation";
import { getSummarySchema } from "./dto/summary.dto";
import { getSummary } from "./service/summary.service";
export const GET = withErrorHandling(
  withAuth(withQueryValidation(getSummary, getSummarySchema))
);
