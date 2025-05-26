// app/api/subscriptions/_service/deleteSubscription.service.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { SubscriptionStatus } from "@prisma/client";

export async function deleteSubscription({ id }: { id: number }) {
  // 1️⃣ fetch the subscription and its plan
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

  // 2️⃣ compute net loan impact (price − amountPaid)
  const netLoan = sub.price - sub.amountPaid;

  // 3️⃣ wrap in a transaction: refund loanBalance then delete
  const [_, deleted] = await prisma.$transaction([
    prisma.kid.update({
      where: { id: sub.kidId },
      data: { loanBalance: { decrement: netLoan } },
    }),
    prisma.subscription.delete({ where: { id } }),
  ]);

  // 4️⃣ respond
  return NextResponse.json(
    {
      message: "Subscription deleted successfully",
      data: deleted,
    },
    { status: 200 }
  );
}
