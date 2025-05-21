import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { GetAttendeesSchemaType } from "../_dto/get-attendees.dto";

export async function getAttendees(
  _: NextRequest,
  data: GetAttendeesSchemaType
) {
  const { date, kidId } = data;

  const attendees = await prisma.attendance.findMany({
    where: {
      date: date || undefined,
      kidId: kidId || undefined,
    },
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
