import { formatDateToDashes } from "@/helpers/formatDate";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function getAllKids({ req }: { req: Request }) {
  const today = formatDateToDashes(new Date());

  const kids = await prisma.kid.findMany({
    include: {
      attendances: {
        where: {
          date: today,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const formattedKids = kids.map((kid) => ({
    ...kid,
    hasAttendedToday: kid.attendances.some(
      (attendance) => attendance.date === today
    ),
  }));
  return NextResponse.json({
    data: formattedKids,
  });
}
