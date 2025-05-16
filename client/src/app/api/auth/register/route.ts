import { register } from "@/backend/auth/apis/register";
export async function POST(req: Request) {
  // return NextResponse.json(body, { status: 200 });
  return await register({ req });
}
