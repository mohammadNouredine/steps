import { withAuth } from "@/backend/helpers/withAuth";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { editUserPermissions } from "@/backend/users/services/edit-user-permissions.service";
import { NextRequest, NextResponse } from "next/server";

// Edit user permissions
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
    withAuth(async () => editUserPermissions({ req, id: parseInt(id) }))
  )(req);
}
