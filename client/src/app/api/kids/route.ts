import { addKid } from "@/backend/kids/services/add-kid.service";
import { getAllKids } from "@/backend/kids/services/get-all-kids.service";
import { editKid } from "@/backend/kids/services/edit-kid.service";

//get all users
export async function GET(req: Request) {
  return await getAllKids({ req });
}

//add kid
export async function POST(req: Request) {
  return await addKid({ req });
}

//edit kid
export async function PUT(req: Request) {
  return await editKid({ req });
}
