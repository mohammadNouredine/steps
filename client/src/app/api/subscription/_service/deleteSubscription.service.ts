import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { BillingMode } from "@prisma/client";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function deleteSubscription(
  req: NextRequest,
  { id }: { id: number }
) {
  // 1️⃣ fetch subscription and plan
  const sub = await prisma.subscription.findUnique({
    where: { id },
    include: { plan: true, kid: true },
  });
  if (!sub) {
    return NextResponse.json(
      { message: `Subscription with id=${id} not found` },
      { status: 404 }
    );
  }

  // 2️⃣ compute refund/loan adjustment depending on billing mode
  let loanAdjust = 0;
  let refundAmount = 0;

  if (sub.plan.billingMode === BillingMode.PREPAID) {
    // refund unused portion
    const now = new Date();
    const attendCount = await prisma.attendance.count({
      where: {
        kidId: sub.kidId,
        date: {
          gte: sub.startDate,
          lte: now,
        },
      },
    });
    const usedAmount = (sub.plan.price / sub.plan.duration) * attendCount;
    refundAmount = sub.plan.price - usedAmount;
    loanAdjust -= refundAmount;
  } else if (sub.plan.billingMode === BillingMode.USAGE) {
    // For USAGE, refund all remaining loan related to this subscription
    refundAmount = sub.price - sub.amountPaid;
    loanAdjust -= refundAmount;
  }

  // 3️⃣ transaction: update loan and delete subscription
  const [data, deleted] = await Promise.all([
    prisma.kid.update({
      where: { id: sub.kidId },
      data: { loanBalance: { increment: loanAdjust } },
    }),
    prisma.subscription.delete({ where: { id } }),
  ]);

  // Log the transaction after successful subscription deletion
  try {
    const userId = getLoggedInUserId({ req });
    if (userId) {
      const discountAmount = sub.discountPercentage
        ? (sub.price * sub.discountPercentage) / 100
        : 0;

      await KidTransactionService.logSubscriptionDeletion(
        sub.kidId,
        userId,
        id, // Use the original subscription ID for reference
        sub.price,
        discountAmount,
        {
          planName: sub.plan.name,
          planDuration: sub.plan.duration,
          billingMode: sub.plan.billingMode,
          startDate: sub.startDate,
          endDate: sub.endDate,
          amountPaid: sub.amountPaid,
          discountPercentage: sub.discountPercentage,
          refundAmount,
          attendancesCount:
            sub.plan.billingMode === BillingMode.PREPAID
              ? await prisma.attendance.count({
                  where: {
                    kidId: sub.kidId,
                    date: {
                      gte: sub.startDate,
                      lte: new Date(),
                    },
                  },
                })
              : 0,
          kidName: `${sub.kid.firstName} ${sub.kid.lastName}`,
        }
      );
    }
  } catch (transactionError) {
    console.error(
      "Failed to log subscription deletion transaction:",
      transactionError
    );
    // Don't fail the main operation if transaction logging fails
  }

  console.log("DATA:", data);
  return NextResponse.json(
    {
      message: "Subscription deleted successfully",
      data: deleted,
    },
    { status: 200 }
  );
}
