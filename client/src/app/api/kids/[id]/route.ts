//delete kid

import { deleteKid } from "@/backend/kids/services/delete-kid.service";
import { editKid } from "@/backend/kids/services/edit-kid.service";
import { NextResponse } from "next/server";

//here  i want to make the delete take query param of id and then delete the kid with that id
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
  return deleteKid({ id: parseInt(id) });
}

//edit kid
export async function PATCH(
  req: Request,
  { params }: { params: { id?: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json(
      { message: "Missing path parameter `id`" },
      { status: 400 }
    );
  }
  return editKid({ req, id: parseInt(id) });
}
