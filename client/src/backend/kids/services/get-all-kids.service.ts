import getDayRange from "@/backend/helpers/getDayRange";
import { formatDateToDashes } from "@/helpers/formatDate";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function getAllKids() {
  const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));
  const startOfTomorrow = new Date(
    new Date().setDate(new Date().getDate() + 1)
  );

  const kids = await prisma.kid.findMany({
    include: {
      attendances: {
        where: {
          date: {
            gte: startOfToday,
            lte: startOfTomorrow,
          },
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
      (attendance) =>
        attendance.date < startOfTomorrow && attendance.date > startOfToday
    ),
  }));
  return NextResponse.json({
    data: formattedKids,
  });
}
