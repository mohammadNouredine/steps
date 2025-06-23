import { withAuth } from "@/backend/helpers/withAuth";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { getPermissions } from "@/backend/users/services/get-permissions.service";
import { NextRequest } from "next/server";

// Get all available permissions
export async function GET(req: NextRequest) {
  return withErrorHandling(withAuth(async () => getPermissions()))(req);
}
