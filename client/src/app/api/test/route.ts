import { NextResponse } from "next/server";
export async function GET(req: Request) {
  //extract search from request
  const search = new URL(req.url).searchParams.get("search");

  return NextResponse.json({ message: "Hello, world!" + search });
}
