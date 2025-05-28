import { NextResponse } from "next/server";
import { deleteNote } from "../_service/deleteNote.service";

export async function DELETE(
  _: Request,
  { params }: { params: { id?: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json(
      { message: "Missing path parameter `id`" },
      { status: 400 }
    );
  }
  return deleteNote({ id: parseInt(id) });
}
