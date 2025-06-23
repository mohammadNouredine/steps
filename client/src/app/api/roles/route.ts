import { withAuth } from "@/backend/helpers/withAuth";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { getUserRoles } from "@/backend/users/services/get-user-roles.service";
import { NextRequest } from "next/server";

// Get all roles
export async function GET(req: NextRequest) {
  return withErrorHandling(withAuth(async () => getUserRoles()))(req);
}
