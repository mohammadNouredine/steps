import { autoLogin } from "@/backend/auth/apis/auto-login";

export async function GET(req: Request) {
  return await autoLogin({ req });
}
