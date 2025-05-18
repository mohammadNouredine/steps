import prisma from "@/lib/db";
import { verifyJwtToken } from "../auth/lib/jwt-token-utils";
import { User } from "@prisma/client";
import { headers } from "next/headers";

export async function getLoggedInUser(): Promise<User | null> {
  try {
    const headersList = headers();
    const token = headersList.get("authorization")?.split(" ")[1];
    if (!token) return null;

    const JwtPayload = verifyJwtToken(token);
    const user = await prisma.user.findUnique({
      where: {
        id: JwtPayload?.userId,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}
