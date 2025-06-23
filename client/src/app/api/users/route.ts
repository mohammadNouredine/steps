import { withAuth } from "@/backend/helpers/withAuth";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { addUser } from "@/backend/users/services/add-user.service";
import { getAllUsers } from "@/backend/users/services/get-all-users.service";
import { NextRequest } from "next/server";

// Get all users
export async function GET(req: NextRequest) {
  return withErrorHandling(withAuth(async () => getAllUsers()))(req);
}

// Add user
export async function POST(req: NextRequest) {
  return withErrorHandling(withAuth(async () => addUser({ req })))(req);
}
