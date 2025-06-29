import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { CreateAttendanceDto } from "../_dto/mutate-attendee.dto.js";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function createAttendance(
  req: NextRequest,
  data: CreateAttendanceDto
) {
  const { date, kidId, extraCharge, note } = data;

  // 1️⃣ ensure kid exists
  const kid = await prisma.kid.findUnique({ where: { id: parseInt(kidId) } });
  if (!kid) {
    return NextResponse.json({ message: "Kid not found" }, { status: 404 });
  }

  // Get kid's current loan balance BEFORE making changes
  const loanBalanceBefore = kid.loanBalance;

  // 2️⃣ prevent duplicate attendance
  const existing = await prisma.attendance.findUnique({
    where: { kidId_date: { kidId: parseInt(kidId), date } },
  });
  if (existing) {
    return NextResponse.json(
      { message: "Attendance already exists" },
      { status: 400 }
    );
  }

  // 3️⃣ create attendance record
  const attendance = await prisma.attendance.create({
    data: {
      date,
      kidId: parseInt(kidId),
      note,
      extraCharge,
    },
  });

  // 4️⃣ if the kid has a USAGE plan active today, bill them
  const subscription = await prisma.subscription.findFirst({
    where: {
      kidId: parseInt(kidId),
      status: "ACTIVE",
      startDate: { lte: new Date(date) },
      endDate: { gte: new Date(date) },
    },
    include: { plan: true },
  });

  let usageCharge = 0;
  if (subscription && subscription.plan.billingMode === "USAGE") {
    // increment loanBalance by the plan price
    usageCharge = subscription.plan.price;
    await prisma.kid.update({
      where: { id: parseInt(kidId) },
      data: { loanBalance: { increment: usageCharge } },
    });
  }

  const totalCharge = (extraCharge || 0) + usageCharge;
  const loanBalanceAfter = loanBalanceBefore + totalCharge;

  // Log the transaction after successful attendance creation
  try {
    const userId = getLoggedInUserId({ req });
    if (userId) {
      await KidTransactionService.createTransaction({
        kidId: parseInt(kidId),
        userId,
        actionType: "ATTENDANCE_CREATE",
        operationType: "CREATE",
        transactionAmount: totalCharge,
        loanBalanceBefore,
        loanBalanceAfter,
        description:
          totalCharge > 0
            ? `Attendance with extra charge of ${totalCharge}`
            : "Attendance recorded",
        metadata: {
          date,
          note,
          extraCharge: extraCharge || 0,
          usageCharge,
          subscriptionId: subscription?.id,
          planName: subscription?.plan.name,
          billingMode: subscription?.plan.billingMode,
          kidName: `${kid.firstName} ${kid.lastName}`,
        },
        relatedAttendanceId: attendance.id,
      });
    }
  } catch (transactionError) {
    console.error(
      "Failed to log attendance creation transaction:",
      transactionError
    );
    // Don't fail the main operation if transaction logging fails
  }

  return NextResponse.json(
    { message: "Attendance added successfully", data: attendance },
    { status: 200 }
  );
}
