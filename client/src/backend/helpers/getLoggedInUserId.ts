import { verifyJwtToken } from "../auth/lib/jwt-token-utils";

export function getLoggedInUserId({ req }: { req: Request }) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    console.log("TOKEN IN GET LOGGED IN USER ID", token);
    if (!token) return null;

    const JwtPayload = verifyJwtToken(token);
    console.log("JWT PAYLOAD IN GET LOGGED IN USER ID", JwtPayload);
    return JwtPayload?.userId || null;
  } catch (error) {
    return null;
  }
}
