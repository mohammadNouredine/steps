import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { SubscriptionStatus, BillingMode } from "@prisma/client";

export async function deleteSubscription({ id }: { id: number }) {
  // 1️⃣ fetch subscription and plan
  const sub = await prisma.subscription.findUnique({
    where: { id },
    include: { plan: true },
  });
  if (!sub) {
    return NextResponse.json(
      { message: `Subscription with id=${id} not found` },
      { status: 404 }
    );
  }

  // 2️⃣ compute refund/loan adjustment depending on billing mode
  let loanAdjust = 0;

  if (sub.plan.billingMode === BillingMode.PREPAID) {
    // refund unused portion
    const now = new Date();
    const attendCount = await prisma.attendance.count({
      where: {
        kidId: sub.kidId,
        date: {
          gte: sub.startDate.toISOString().slice(0, 10),
          lte: now.toISOString().slice(0, 10),
        },
      },
    });
    const usedAmount = (sub.plan.price / sub.plan.duration) * attendCount;
    const refund = sub.plan.price - usedAmount;
    loanAdjust -= refund;
  } else if (sub.plan.billingMode === BillingMode.USAGE) {
    // For USAGE, refund all remaining loan related to this subscription
    loanAdjust -= sub.price - sub.amountPaid;
  }

  // 3️⃣ transaction: update loan and delete subscription
  const [_, deleted] = await prisma.$transaction([
    prisma.kid.update({
      where: { id: sub.kidId },
      data: { loanBalance: { increment: loanAdjust } },
    }),
    prisma.subscription.delete({ where: { id } }),
  ]);

  return NextResponse.json(
    {
      message: "Subscription deleted successfully",
      data: deleted,
    },
    { status: 200 }
  );
}
