import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { deletePlan } from "../_service/deletePlan.service.js";
import { withBodyValidation } from "@/backend/helpers/withValidation";
import { editPlan } from "../_service/editPlan.service.js";
import { editPlanSchema } from "../_dto/add-edit-plan.dto.ts";

//get all users
export async function DELETE(req: Request) {
  return withErrorHandling(deletePlan);
}

//add kid
export async function PATCH(req: Request) {
  return withErrorHandling(withBodyValidation(editPlan, editPlanSchema));
}
