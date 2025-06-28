import { NextRequest, NextResponse } from "next/server";
import { deletePurchase } from "../_service/deletePurchase.service";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import {
  EditPurchaseDto,
  editPurchaseSchema,
} from "../_dto/mutatePurchase.dto";
import { withBodyValidation } from "@/backend/helpers/withValidation";
import { editPurchase } from "../_service/editPurchase.service";

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
  return withErrorHandling(async () => deletePurchase(req, parseInt(id)))(req);
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
  const handler = async (req: NextRequest, validatedData: EditPurchaseDto) => {
    return editPurchase(req, validatedData, parseInt(id));
  };

  return withErrorHandling(withBodyValidation(handler, editPurchaseSchema))(
    req
  );
}
