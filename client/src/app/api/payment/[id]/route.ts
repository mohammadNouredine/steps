import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { NextRequest, NextResponse } from "next/server";
import { deletePayment } from "../_service/deletePayment.service";
import { withAuth } from "@/backend/helpers/withAuth";

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
  return withErrorHandling(withAuth(async () => deletePayment(parseInt(id))))(
    req
  );
}
