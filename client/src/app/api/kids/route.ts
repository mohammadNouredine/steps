import { withAuth } from "@/backend/helpers/withAuth";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { addKid } from "@/backend/kids/services/add-kid.service";
import { getAllKids } from "@/backend/kids/services/get-all-kids.service";
import { NextRequest } from "next/server";

//get all users
export async function GET(req: NextRequest) {
  // return await getAllKids();
  return withErrorHandling(withAuth(async () => getAllKids()))(req);
}

//add kid
export async function POST(req: NextRequest) {
  // return await addKid({ req });
  return withErrorHandling(withAuth(async () => addKid({ req })))(req);
}
