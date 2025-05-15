import { verifyJwtToken } from "../lib/jwt-token-utils";

export function getLoggedInUserId({ req }: { req: Request }) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) return null;

    const JwtPayload = verifyJwtToken(token);

    return JwtPayload?.userId || null;
  } catch (error) {
    return null;
  }
}
