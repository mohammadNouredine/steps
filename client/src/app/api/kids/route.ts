import { addKid } from "@/backend/kids/services/add-kid.service";
import { getAllKids } from "@/backend/kids/services/get-all-kids.service";

//get all users
export async function GET() {
  return await getAllKids();
}

//add kid
export async function POST(req: Request) {
  return await addKid({ req });
}
