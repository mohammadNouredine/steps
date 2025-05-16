import { login } from "@/backend/auth/apis/login";

export async function POST(req: Request) {
  return await login({ req });
}
