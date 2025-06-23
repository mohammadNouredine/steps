import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { seedPermissions } from "@/backend/users/services/seed-permissions.service";
import { NextRequest } from "next/server";

// Seed permissions (no auth required for setup)
export async function POST(req: NextRequest) {
  return withErrorHandling(async () => seedPermissions())(req);
}
