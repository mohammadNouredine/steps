import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { CreateAttendanceDto } from "../_dto/mutate-attendee.dto.ts.js";
import { CustomErrorResponse } from "@/backend/helpers/customErrorResponse.js";

export async function createAttendance(
  _: NextRequest,
  data: CreateAttendanceDto
) {
  const { date, kidId, extraCharge, note } = data;

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
    return CustomErrorResponse("Attendance already exists", 400);
  } else {
    await prisma.attendance.create({
      data: {
        date: date,
        kidId: parseInt(kidId),
        note: note,
        extraCharge: extraCharge,
      },
    });
  }

  return NextResponse.json(
    { message: "Attendance added successfully" },
    { status: 200 }
  );
}
