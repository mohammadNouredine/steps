import { register } from "@/common/Backend/Auth/APIs/register";

export async function POST(req: Request) {
  // return NextResponse.json(body, { status: 200 });
  return await register({ req });
}
