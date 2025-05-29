import { getDayRangeFromDate } from "@/backend/helpers/getDayRange";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function getAllKids() {
  const { startOfDay, startOfNextDay } = getDayRangeFromDate(new Date());
  const kids = await prisma.kid.findMany({
    include: {
      attendances: {
        where: {
          date: {
            gte: startOfDay,
            lte: startOfNextDay,
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
        attendance.date > startOfDay && attendance.date < startOfNextDay
    ),
  }));
  return NextResponse.json({
    data: formattedKids,
  });
}
