// app/api/attendances/_service/toggleAttendance.service.ts
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ToggleAttendeeDto } from "../_dto/mutate-attendee.dto.js";
import { SubscriptionStatus, BillingMode } from "@prisma/client";

export async function toggleAttendee(
  _: NextRequest,
  data: ToggleAttendeeDto
): Promise<NextResponse> {
  const { date, kidId } = data;
  const kidIdNum = parseInt(kidId, 10);

  // 1️⃣ validate kid
  const kid = await prisma.kid.findUnique({ where: { id: kidIdNum } });
  if (!kid) {
    return NextResponse.json({ message: "Kid not found" }, { status: 404 });
  }

  // 2️⃣ check if attendance exists
  const existing = await prisma.attendance.findFirst({
    where: { kidId: kidIdNum, date },
  });

  if (existing) {
    // — delete & reverse billing
    const attendanceDate = new Date(date);
    const sub = await prisma.subscription.findFirst({
      where: {
        kidId: kidIdNum,
        status: SubscriptionStatus.ACTIVE,
        startDate: { lte: attendanceDate },
        endDate: { gte: attendanceDate },
      },
      include: { plan: true },
    });
    if (sub && sub.plan.billingMode === BillingMode.USAGE) {
      const refund = sub.plan.price + (existing.extraCharge ?? 0);
      await prisma.kid.update({
        where: { id: kidIdNum },
        data: { loanBalance: { decrement: refund } },
      });
    }

    const deleted = await prisma.attendance.delete({
      where: { id: existing.id },
    });
    return NextResponse.json(
      { data: deleted, message: "Attendance deleted successfully" },
      { status: 200 }
    );
  } else {
    // — create & apply billing
    const created = await prisma.attendance.create({
      data: { kidId: kidIdNum, date },
    });

    const attendanceDate = new Date(date);
    const sub = await prisma.subscription.findFirst({
      where: {
        kidId: kidIdNum,
        status: SubscriptionStatus.ACTIVE,
        startDate: { lte: attendanceDate },
        endDate: { gte: attendanceDate },
      },
      include: { plan: true },
    });
    if (sub && sub.plan.billingMode === BillingMode.USAGE) {
      await prisma.kid.update({
        where: { id: kidIdNum },
        data: { loanBalance: { increment: sub.plan.price } },
      });
    }

    return NextResponse.json(
      { data: created, message: "Attendance added successfully" },
      { status: 200 }
    );
  }
}
