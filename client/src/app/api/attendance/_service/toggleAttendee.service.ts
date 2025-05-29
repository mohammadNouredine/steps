// app/api/attendances/_service/toggleAttendance.service.ts
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ToggleAttendeeDto } from "../_dto/mutate-attendee.dto";
import { SubscriptionStatus, BillingMode } from "@prisma/client";
import { getDayRangeFromDate } from "@/backend/helpers/getDayRange";

export async function toggleAttendee(
  _: NextRequest,
  data: ToggleAttendeeDto
): Promise<NextResponse> {
  const { date, kidId } = data;

  // 1️⃣ validate kid
  const kid = await prisma.kid.findUnique({ where: { id: kidId } });
  if (!kid) {
    return NextResponse.json({ message: "Kid not found" }, { status: 404 });
  }
  const { startOfDay, startOfNextDay } = getDayRangeFromDate(date);
  // 2️⃣ check if attendance exists
  console.log("DATE: ", date);
  console.log("DATE OF TOMORROW: ", new Date(date.getTime() + 86400000));

  const existing = await prisma.attendance.findFirst({
    where: {
      kidId: kidId,
      date: {
        gte: startOfDay,
        lte: startOfNextDay,
      },
    },
  });

  if (existing) {
    // — delete & reverse billing
    const attendanceDate = new Date(date);
    const sub = await prisma.subscription.findFirst({
      where: {
        kidId: kidId,
        status: SubscriptionStatus.ACTIVE,
        startDate: { lte: attendanceDate },
        endDate: { gte: attendanceDate },
      },
      include: { plan: true },
    });
    if (sub && sub.plan.billingMode === BillingMode.USAGE) {
      const refund = sub.plan.price + (existing.extraCharge ?? 0);
      await prisma.kid.update({
        where: { id: kidId },
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
      data: { kidId: kidId, date },
    });

    const attendanceDate = new Date(date);
    const sub = await prisma.subscription.findFirst({
      where: {
        kidId: kidId,
        status: SubscriptionStatus.ACTIVE,
        startDate: { lte: attendanceDate },
        endDate: { gte: attendanceDate },
      },
      include: { plan: true },
    });
    if (sub && sub.plan.billingMode === BillingMode.USAGE) {
      await prisma.kid.update({
        where: { id: kidId },
        data: { loanBalance: { increment: sub.plan.price } },
      });
    }

    return NextResponse.json(
      { data: created, message: "Attendance added successfully" },
      { status: 200 }
    );
  }
}
