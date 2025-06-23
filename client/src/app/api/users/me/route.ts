import { withAuth } from "@/backend/helpers/withAuth";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { getCurrentUser } from "@/backend/users/services/get-current-user.service";
import { NextRequest } from "next/server";

// Get current user
export async function GET(req: NextRequest) {
  return withErrorHandling(
    withAuth(async (user: any) => getCurrentUser({ userId: user.id }))
  )(req);
}
