import { NextRequest } from "next/server";
import { getLoggedInUser } from "./getLoggedInUser";
import { CustomErrorResponse } from "./customErrorResponse";

export function withAuth(handler: any) {
  return async (req: NextRequest) => {
    const user = await getLoggedInUser();

    if (!user) return CustomErrorResponse("Unauthenticated", 401);

    return await handler(req);
  };
}
