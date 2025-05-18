import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function deleteKid({ req }: { req: Request }) {
  const { id } = await req.json();

  const kid = await prisma.kid.delete({ where: { id } });

  return NextResponse.json(
    {
      message: "Kid deleted successfully",
      data: kid,
    },
    { status: 200 }
  );
}
