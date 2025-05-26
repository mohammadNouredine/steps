import { autoLogin } from "@/backend/auth/apis/auto-login";

export async function GET(req: Request) {
  try {
    return await autoLogin({ req });
  } catch (error) {
    console.error("Auto-login error:", error);
    return new Response("Auto-login failed", { status: 500 });
  }
}
