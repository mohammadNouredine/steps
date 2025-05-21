import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { withBodyValidation } from "@/backend/helpers/withValidation";
import { editPlan } from "../_service/editPlan.service";
import { EditPlanDto, editPlanSchema } from "../_dto/add-edit-plan.dto.ts";
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

//edit plan
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

  // Wrap editPlan in a function that receives both validated body and id
  const handler = async (req: NextRequest, validatedData: EditPlanDto) => {
    return editPlan(validatedData, parseInt(id));
  };

  return withErrorHandling(withBodyValidation(handler, editPlanSchema))(req);
}
