import { login } from "@/common/Backend/Auth/APIs/login";

export async function POST(req: Request) {
  return await login({ req });
}
