// app/api/attendances/_service/toggleAttendance.service.ts
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ToggleAttendeeDto } from "../_dto/mutate-attendee.dto";
import { SubscriptionStatus, BillingMode } from "@prisma/client";
import { getDayRangeFromDate } from "@/backend/helpers/getDayRange";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function toggleAttendee(
  req: NextRequest,
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

    let totalCharge = existing.extraCharge ?? 0;
    if (sub && sub.plan.billingMode === BillingMode.USAGE) {
      const refund = sub.plan.price + (existing.extraCharge ?? 0);
      totalCharge = refund;
      await prisma.kid.update({
        where: { id: kidId },
        data: { loanBalance: { decrement: refund } },
      });
    }

    const deleted = await prisma.attendance.delete({
      where: { id: existing.id },
    });

    // Log the transaction after successful attendance deletion
    try {
      const userId = getLoggedInUserId({ req });
      if (userId) {
        await KidTransactionService.logAttendanceDeletion(
          kidId,
          userId,
          existing.id,
          totalCharge,
          {
            date,
            note: existing.note,
            extraCharge: existing.extraCharge || 0,
            usageCharge:
              sub && sub.plan.billingMode === BillingMode.USAGE
                ? sub.plan.price
                : 0,
            subscriptionId: sub?.id,
            planName: sub?.plan.name,
            billingMode: sub?.plan.billingMode,
            kidName: `${kid.firstName} ${kid.lastName}`,
          }
        );
      }
    } catch (transactionError) {
      console.error(
        "Failed to log attendance deletion transaction:",
        transactionError
      );
      // Don't fail the main operation if transaction logging fails
    }

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

    let totalCharge = 0;
    if (sub && sub.plan.billingMode === BillingMode.USAGE) {
      totalCharge = sub.plan.price;
      await prisma.kid.update({
        where: { id: kidId },
        data: { loanBalance: { increment: sub.plan.price } },
      });
    }

    // Log the transaction after successful attendance creation
    try {
      const userId = getLoggedInUserId({ req });
      if (userId) {
        await KidTransactionService.logAttendanceCreation(
          kidId,
          userId,
          created.id,
          totalCharge,
          {
            date,
            extraCharge: 0,
            usageCharge: totalCharge,
            subscriptionId: sub?.id,
            planName: sub?.plan.name,
            billingMode: sub?.plan.billingMode,
            kidName: `${kid.firstName} ${kid.lastName}`,
          }
        );
      }
    } catch (transactionError) {
      console.error(
        "Failed to log attendance creation transaction:",
        transactionError
      );
      // Don't fail the main operation if transaction logging fails
    }

    return NextResponse.json(
      { data: created, message: "Attendance added successfully" },
      { status: 200 }
    );
  }
}
