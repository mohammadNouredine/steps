//delete kid

import { withAuth } from "@/backend/helpers/withAuth";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { withPermission } from "@/backend/helpers/withPermission";
import { deleteKid } from "@/backend/kids/services/delete-kid.service";
import { editKid } from "@/backend/kids/services/edit-kid.service";
import { NextRequest, NextResponse } from "next/server";
import {
  PermissionModuleEnum,
  PermissionActionEnum,
} from "@/types/permissions";

//here  i want to make the delete take query param of id and then delete the kid with that id
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
  // return deleteKid({ id: parseInt(id) });
  return withErrorHandling(
    withAuth(
      withPermission({
        module: PermissionModuleEnum.KIDS,
        action: PermissionActionEnum.DELETE,
      })(async () => deleteKid({ id: parseInt(id) }))
    )
  )(req);
}

//edit kid
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
  // return editKid({ req, id: parseInt(id) });
  return withErrorHandling(
    withAuth(
      withPermission({
        module: PermissionModuleEnum.KIDS,
        action: PermissionActionEnum.WRITE,
      })(async () => editKid({ req, id: parseInt(id) }))
    )
  )(req);
}
