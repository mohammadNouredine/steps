// app/api/attendances/_service/deleteAttendance.service.ts
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { DeleteAttendanceDto } from "../_dto/delete-attendee.dto";
import { SubscriptionStatus, BillingMode } from "@prisma/client";

export async function deleteAttendance(
  _: NextRequest,
  data: DeleteAttendanceDto
): Promise<NextResponse> {
  const { attendanceId } = data;

  // 1️⃣ fetch the record to know its date & extraCharge
  const attendance = await prisma.attendance.findUnique({
    where: { id: attendanceId },
  });
  if (!attendance) {
    return NextResponse.json(
      { message: "Attendance not found" },
      { status: 404 }
    );
  }

  // 2️⃣ reverse billing for USAGE plans
  const attendanceDate = new Date(attendance.date);
  const sub = await prisma.subscription.findFirst({
    where: {
      kidId: attendance.kidId,
      status: SubscriptionStatus.ACTIVE,
      startDate: { lte: attendanceDate },
      endDate: { gte: attendanceDate },
    },
    include: { plan: true },
  });
  if (sub && sub.plan.billingMode === BillingMode.USAGE) {
    const refund = sub.plan.price + (attendance.extraCharge ?? 0);
    await prisma.kid.update({
      where: { id: attendance.kidId },
      data: { loanBalance: { decrement: refund } },
    });
  }

  // 3️⃣ delete
  const deleted = await prisma.attendance.delete({
    where: { id: attendanceId },
  });

  return NextResponse.json({ data: deleted }, { status: 200 });
}
