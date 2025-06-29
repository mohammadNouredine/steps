// app/api/attendances/_service/deleteAttendance.service.ts
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { DeleteAttendanceDto } from "../_dto/delete-attendee.dto";
import { SubscriptionStatus, BillingMode } from "@prisma/client";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function deleteAttendance(
  req: NextRequest,
  data: DeleteAttendanceDto
): Promise<NextResponse> {
  const { attendanceId } = data;

  // 1️⃣ fetch the record to know its date & extraCharge
  const attendance = await prisma.attendance.findUnique({
    where: { id: attendanceId },
    include: {
      kid: {
        select: {
          firstName: true,
          lastName: true,
          loanBalance: true,
        },
      },
    },
  });
  if (!attendance) {
    return NextResponse.json(
      { message: "Attendance not found" },
      { status: 404 }
    );
  }

  // Get loan balance BEFORE making changes
  const loanBalanceBefore = attendance.kid.loanBalance;

  // 2️⃣ reverse billing for USAGE plans
  const attendanceDate = attendance.date;
  const sub = await prisma.subscription.findFirst({
    where: {
      kidId: attendance.kidId,
      status: SubscriptionStatus.ACTIVE,
      startDate: { lte: attendanceDate },
      endDate: { gte: attendanceDate },
    },
    include: { plan: true },
  });

  let totalCharge = attendance.extraCharge ?? 0;
  if (sub && sub.plan.billingMode === BillingMode.USAGE) {
    const refund = sub.plan.price + (attendance.extraCharge ?? 0);
    totalCharge = refund;
    await prisma.kid.update({
      where: { id: attendance.kidId },
      data: { loanBalance: { decrement: refund } },
    });
  }

  const loanBalanceAfter = loanBalanceBefore - totalCharge;

  // 3️⃣ delete
  const deleted = await prisma.attendance.delete({
    where: { id: attendanceId },
  });

  // Log the transaction after successful attendance deletion
  try {
    const userId = getLoggedInUserId({ req });
    if (userId) {
      await KidTransactionService.createTransaction({
        kidId: attendance.kidId,
        userId,
        actionType: "ATTENDANCE_DELETE",
        operationType: "DELETE",
        transactionAmount: totalCharge,
        loanBalanceBefore,
        loanBalanceAfter,
        description: "Attendance deleted",
        metadata: {
          date: attendance.date,
          note: attendance.note,
          extraCharge: attendance.extraCharge || 0,
          usageCharge:
            sub && sub.plan.billingMode === BillingMode.USAGE
              ? sub.plan.price
              : 0,
          subscriptionId: sub?.id,
          planName: sub?.plan.name,
          billingMode: sub?.plan.billingMode,
          kidName: `${attendance.kid.firstName} ${attendance.kid.lastName}`,
        },
        relatedAttendanceId: attendanceId,
      });
    }
  } catch (transactionError) {
    console.error(
      "Failed to log attendance deletion transaction:",
      transactionError
    );
    // Don't fail the main operation if transaction logging fails
  }

  return NextResponse.json({ data: deleted }, { status: 200 });
}
