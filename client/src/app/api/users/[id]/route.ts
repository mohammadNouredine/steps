import { withAuth } from "@/backend/helpers/withAuth";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { deleteUser } from "@/backend/users/services/delete-user.service";
import { editUser } from "@/backend/users/services/edit-user.service";
import { getUserById } from "@/backend/users/services/get-user-by-id.service";
import { NextRequest, NextResponse } from "next/server";

// Get user by id
export async function GET(
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
    withAuth(async () => getUserById({ id: parseInt(id) }))
  )(req);
}

// Edit user
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
  return withErrorHandling(
    withAuth(async () => editUser({ req, id: parseInt(id) }))
  )(req);
}

// Delete user
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
    withAuth(async () => deleteUser({ id: parseInt(id) }))
  )(req);
}
