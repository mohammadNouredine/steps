import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { EditAttendanceDto } from "../_dto/mutate-attendee.dto.ts.js";
import { CustomErrorResponse } from "@/backend/helpers/customErrorResponse.js";

export async function editAttendance(_: NextRequest, data: EditAttendanceDto) {
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
    await prisma.attendance.update({
      where: {
        id: existingAttendance.id,
      },
      data: {
        note: note,
        extraCharge: extraCharge,
      },
    });
  } else {
    return CustomErrorResponse("Attendance not found", 400);
  }

  return NextResponse.json(
    { message: "Attendance edit successfully" },
    { status: 200 }
  );
}
