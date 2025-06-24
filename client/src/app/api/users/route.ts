import { withAuth } from "@/backend/helpers/withAuth";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { withRole } from "@/backend/helpers/withRole";
import { addUser } from "@/backend/users/services/add-user.service";
import { getAllUsers } from "@/backend/users/services/get-all-users.service";
import { NextRequest } from "next/server";
import { RoleEnum } from "@/types/permissions";

// Get all users
export async function GET(req: NextRequest) {
  return withErrorHandling(
    withAuth(
      withRole({
        roles: [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN],
      })(async () => getAllUsers())
    )
  )(req);
}

// Add user
export async function POST(req: NextRequest) {
  return withErrorHandling(
    withAuth(
      withRole({
        roles: [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN],
      })(async () => addUser({ req }))
    )
  )(req);
}
