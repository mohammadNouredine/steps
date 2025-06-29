// app/api/attendances/_service/editAttendance.service.ts
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { EditAttendanceDto } from "../_dto/mutate-attendee.dto.js";
import { SubscriptionStatus, BillingMode } from "@prisma/client";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function editAttendance(
  req: NextRequest,
  data: EditAttendanceDto
): Promise<NextResponse> {
  const { date, kidId, extraCharge, note } = data;
  const kidIdNum = parseInt(kidId, 10);

  // 1️⃣ validate kid
  const kid = await prisma.kid.findUnique({ where: { id: kidIdNum } });
  if (!kid) {
    return NextResponse.json({ message: "Kid not found" }, { status: 404 });
  }

  // Get kid's current loan balance BEFORE making changes
  const loanBalanceBefore = kid.loanBalance;

  // 2️⃣ fetch existing attendance
  const existing = await prisma.attendance.findFirst({
    where: { kidId: kidIdNum, date },
  });
  if (!existing) {
    return NextResponse.json(
      { message: "Attendance not found" },
      { status: 400 }
    );
  }

  // 3️⃣ compute extraCharge diff
  const oldCharge = existing.extraCharge ?? 0;
  const newCharge = extraCharge ?? 0;
  const deltaCharge = newCharge - oldCharge;

  // 4️⃣ update attendance record
  const updated = await prisma.attendance.update({
    where: { id: existing.id },
    data: { note, extraCharge },
  });

  // 5️⃣ adjust loanBalance if USAGE plan
  if (deltaCharge !== 0) {
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
        data: { loanBalance: { increment: deltaCharge } },
      });
    }
  }

  const loanBalanceAfter = loanBalanceBefore + deltaCharge;

  // Log the transaction after successful attendance update
  try {
    const userId = getLoggedInUserId({ req });
    if (userId) {
      await KidTransactionService.createTransaction({
        kidId: kidIdNum,
        userId,
        actionType: "ATTENDANCE_UPDATE",
        operationType: "UPDATE",
        transactionAmount: Math.abs(deltaCharge),
        loanBalanceBefore,
        loanBalanceAfter,
        description: `Attendance extra charge updated from ${oldCharge} to ${newCharge}`,
        metadata: {
          date,
          oldNote: existing.note,
          newNote: note,
          oldExtraCharge: oldCharge,
          newExtraCharge: newCharge,
          chargeDifference: deltaCharge,
          kidName: `${kid.firstName} ${kid.lastName}`,
        },
        relatedAttendanceId: updated.id,
      });
    }
  } catch (transactionError) {
    console.error(
      "Failed to log attendance update transaction:",
      transactionError
    );
    // Don't fail the main operation if transaction logging fails
  }

  return NextResponse.json(
    { data: updated, message: "Attendance edited successfully" },
    { status: 200 }
  );
}
