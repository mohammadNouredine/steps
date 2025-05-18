import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function getAllKids({ req }: { req: Request }) {
  //sort according to updated at
  const kids = await prisma.kid.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
  return NextResponse.json({
    data: kids,
  });
}
