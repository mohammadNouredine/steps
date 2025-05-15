import { autoLogin } from "@/common/Backend/Auth/APIs/auto-login";

export async function GET(req: Request) {
  return await autoLogin({ req });
}
