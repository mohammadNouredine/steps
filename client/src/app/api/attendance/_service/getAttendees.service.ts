import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { GetAttendeesSchemaType } from "../_dto/get-attendees.dto";
export async function getAttendees(data: GetAttendeesSchemaType) {
  const attendees = await prisma.attendance.findMany({
    where: {
      date: data.date,
      kidId: data.kidId || undefined,
    },
    include: {
      kid: true,
    },
  });

  return NextResponse.json(attendees, { status: 200 });
}
