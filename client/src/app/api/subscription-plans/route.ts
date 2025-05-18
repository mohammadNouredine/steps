import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { addPlan } from "./_service/addPlan.service";

import { getAllPlans } from "./_service/getAllPlans.service";
import { withBodyValidation } from "@/backend/helpers/withValidation";
import { addPlanSchema } from "./_dto/add-edit-plan.dto.ts";

//get all users
export async function GET() {
  return withErrorHandling(getAllPlans());
}

//add kid
export async function POST(req: Request) {
  return withErrorHandling(withBodyValidation(addPlan, addPlanSchema));
}
