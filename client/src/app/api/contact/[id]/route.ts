import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/backend/helpers/withAuth";
import { deleteContactMessage } from "../_service/contact-message.service";
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
  return withErrorHandling(
    withAuth(async () => deleteContactMessage(parseInt(id)))
  )(req);
}
