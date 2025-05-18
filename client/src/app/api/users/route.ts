import { addKid } from "@/backend/users/services/add-kid.service";
import { getAllKids } from "@/backend/users/services/get-all-kids.service";
import { editKid } from "@/backend/users/services/edit-kid.service";
import { deleteKid } from "@/backend/users/services/delete-kid.service";

//get all users
export async function GET(req: Request) {
  return await getAllKids({ req });
}

//add kid
export async function POST(req: Request) {
  return await addKid({ req });
}

//delete kid
export async function DELETE(req: Request) {
  return await deleteKid({ req });
}

//edit kid
export async function PUT(req: Request) {
  return await editKid({ req });
}
