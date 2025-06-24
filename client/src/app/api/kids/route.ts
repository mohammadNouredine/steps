import { withAuth } from "@/backend/helpers/withAuth";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { withPermission } from "@/backend/helpers/withPermission";
import { addKid } from "@/backend/kids/services/add-kid.service";
import { getAllKids } from "@/backend/kids/services/get-all-kids.service";
import { NextRequest } from "next/server";
import {
  PermissionModuleEnum,
  PermissionActionEnum,
} from "@/types/permissions";

//get all users
export async function GET(req: NextRequest) {
  // return await getAllKids();
  return withErrorHandling(
    withAuth(
      withPermission({
        module: PermissionModuleEnum.KIDS,
        action: PermissionActionEnum.READ,
      })(async () => getAllKids())
    )
  )(req);
}

//add kid
export async function POST(req: NextRequest) {
  // return await addKid({ req });
  return withErrorHandling(
    withAuth(
      withPermission({
        module: PermissionModuleEnum.KIDS,
        action: PermissionActionEnum.WRITE,
      })(async () => addKid({ req }))
    )
  )(req);
}
