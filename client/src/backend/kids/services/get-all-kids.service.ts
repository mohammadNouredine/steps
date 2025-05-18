import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function getAllKids({ req }: { req: Request }) {
  const kids = await prisma.kid.findMany();
  return NextResponse.json({
    data: kids,
  });
}
