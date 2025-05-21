import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ToggleAttendeeDto } from "../_dto/mutate-attendee.dto.js";

export async function toggleAttendee(_: NextRequest, data: ToggleAttendeeDto) {
  const { date, kidId } = data;
  console.log("DATE IS: ", date);
  const kid = await prisma.kid.findUnique({
    where: {
      id: parseInt(kidId),
    },
  });

  if (!kid) {
    return NextResponse.json({ message: "Kid not found" }, { status: 404 });
  }

  const existingAttendance = await prisma.attendance.findFirst({
    where: {
      date: date,
      kidId: parseInt(kidId),
    },
  });

  if (existingAttendance) {
    await prisma.attendance.delete({
      where: {
        id: existingAttendance.id,
      },
    });
    return NextResponse.json(
      { message: "Attendance deleted successfully" },
      { status: 200 }
    );
  } else {
    await prisma.attendance.create({
      data: {
        date: date,
        kidId: parseInt(kidId),
      },
    });
  }

  return NextResponse.json(
    { message: "Attendance added successfully" },
    { status: 200 }
  );
}
