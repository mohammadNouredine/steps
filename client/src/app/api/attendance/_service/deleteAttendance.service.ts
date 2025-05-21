import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { DeleteAttendanceDto } from "../_dto/delete-attendee.dto";

export async function deleteAttendance(
  _: NextRequest,
  data: DeleteAttendanceDto
) {
  console.log("DATA TO BE DELETED IS: ", data);
  const { attendanceId } = data;

  const attendance = await prisma.attendance.findUnique({
    where: {
      id: attendanceId,
    },
  });

  if (!attendance) {
    return NextResponse.json(
      { message: "Attendance not found" },
      { status: 404 }
    );
  }

  const deleted = await prisma.attendance.delete({
    where: {
      id: attendanceId,
    },
  });

  return NextResponse.json(
    {
      data: deleted,
    },
    { status: 200 }
  );
}
