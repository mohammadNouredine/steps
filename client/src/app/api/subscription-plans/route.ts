import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { addPlan } from "./_service/addPlan.service";
import { getAllPlans } from "./_service/getAllPlans.service";
import { withBodyValidation } from "@/backend/helpers/withValidation";
import { addPlanSchema } from "./_dto/add-edit-plan.dto.ts";

export const GET = withErrorHandling(() => getAllPlans());
export const POST = withErrorHandling(
  withBodyValidation(addPlan, addPlanSchema)
);
