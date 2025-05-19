import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { withBodyValidation } from "@/backend/helpers/withValidation";
import { editPlan } from "../_service/editPlan.service";
import { editPlanSchema } from "../_dto/add-edit-plan.dto.ts";
import { deletePlan } from "../_service/deletePlan.service";
import { NextRequest, NextResponse } from "next/server";

//get all users

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id?: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json(
      { message: "Missing path parameter `id`" },
      { status: 400 }
    );
  }
  return withErrorHandling(async () => deletePlan(parseInt(id)))(req);
}

//add kid
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id?: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json(
      { message: "Missing path parameter `id`" },
      { status: 400 }
    );
  }

  return withErrorHandling(withBodyValidation(editPlan, editPlanSchema))(req);
}
