import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { NextRequest, NextResponse } from "next/server";
import { deleteExpense } from "../_service/deleteExpense.service";

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
  return withErrorHandling(async () => deleteExpense(parseInt(id)))(req);
}
