import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { GetAttendeesSchemaType } from "../_dto/get-attendees.dto";
import getDayRange from "@/backend/helpers/getDayRange";
import { Prisma } from "@prisma/client";

export async function getAttendees(
  _: NextRequest,
  data: GetAttendeesSchemaType
) {
  const { date, kidId } = data;
  console.log("getAttendees called with data:", data);
  const whereClause: Prisma.AttendanceWhereInput = {};
  if (date) {
    const { startOfDay, startOfNextDay } = getDayRange(date);
    console.log("START OF DAY", startOfDay);
    console.log("START OF NEXT DAY", startOfNextDay);
    whereClause.date = {
      gte: startOfDay,
      lte: startOfNextDay,
    };
  }
  if (kidId) {
    whereClause.kidId = kidId;
  }

  const attendees = await prisma.attendance.findMany({
    where: whereClause,
    include: {
      kid: true,
    },
  });

  return NextResponse.json(
    {
      data: attendees,
    },
    { status: 200 }
  );
}
