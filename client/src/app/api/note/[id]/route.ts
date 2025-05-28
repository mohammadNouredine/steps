import { NextRequest, NextResponse } from "next/server";
import { deleteNote } from "../_service/deleteNote.service";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
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
  // const handler = withAuth(deleteNote({ id: parseInt(id) }));
  // return handler;
  return withErrorHandling(withAuth(deleteNote({ id: parseInt(id) })))(req);
}
