import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

interface JwtPayload {
  userId: number;
}

export function generateJwtToken({ userId }: { userId: number }) {
  console.log("GENERATING JWT TOKEN");
  const token = JWT.sign(
    {
      userId,
    },
    JWT_SECRET,
    { expiresIn: "365d" }
  );
  console.log("GENERATED JWT TOKEN", token);
  return token;
}

export function verifyJwtToken(token: string): JwtPayload | null {
  console.log("VERIFYING JWT TOKEN");
  console.log("TOKEN TO VERIFY", token);
  try {
    const isVerified = JWT.verify(token, JWT_SECRET) as JwtPayload;
    console.log("IS VERIFIED", isVerified);
    return isVerified;
  } catch (error) {
    console.log("ERROR VERIFYING JWT TOKEN", error);
    return null;
  }
}
