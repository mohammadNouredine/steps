import JWT from "jsonwebtoken";

const JWT_SECRET =
  "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000_jwt_secret_75442486-0878-440c-9db1-a7006c25a39f";

interface JwtPayload {
  userId: string;
}

export function generateJwtToken({ userId }: { userId: string }) {
  return JWT.sign(
    {
      userId,
    },
    JWT_SECRET,
    { expiresIn: "365d" }
  );
}

export function verifyJwtToken(token: string): JwtPayload | null {
  return JWT.verify(token, JWT_SECRET) as JwtPayload;
}
