// app/api/subscriptions/_service/addSubscription.service.ts
import { NextRequest, NextResponse } from "next/server";
import { AddSubscriptionSchemaType } from "../_dto/mutate-subscription.dto";
import prisma from "@/lib/db";
import { SubscriptionStatus } from "@prisma/client";

export async function addSubscription(
  _: NextRequest,
  dto: AddSubscriptionSchemaType
) {
  const {
    kidId,
    planId,
    startDate: rawStart,
    amountPaid = 0,
    discountPercentage,
  } = dto;
  const startDate = rawStart ? new Date(rawStart) : new Date();

  // wrap in a transaction since we update multiple records
  const newSub = await prisma.$transaction(async (tx) => {
    // 1️⃣ If there's an ACTIVE subscription, cancel it and refund unused days
    const existing = await tx.subscription.findFirst({
      where: { kidId, status: SubscriptionStatus.ACTIVE },
      include: { plan: true },
    });
    if (existing) {
      const now = new Date();
      // count attendances between existing.startDate and today
      const attendCount = await tx.attendance.count({
        where: {
          kidId,
          date: {
            gte: existing.startDate.toISOString().slice(0, 10),
            lte: now.toISOString().slice(0, 10),
          },
        },
      });
      const usedAmount =
        (existing.plan.price / existing.plan.duration) * attendCount;
      const refund = existing.plan.price - usedAmount;

      // cancel old subscription
      await tx.subscription.update({
        where: { id: existing.id },
        data: { status: SubscriptionStatus.CANCELLED, endDate: now },
      });
      // deduct refund from loanBalance
      await tx.kid.update({
        where: { id: kidId },
        data: { loanBalance: { decrement: refund } },
      });
    }

    // 2️⃣ Create the new subscription
    const plan = await tx.subscriptionPlan.findUnique({
      where: { id: planId },
    });
    if (!plan) throw new Error("Subscription plan not found");

    // compute endDate = start + (duration-1) days
    const endDate = new Date(
      startDate.valueOf() + (plan.duration - 1) * 24 * 60 * 60 * 1000
    );

    const subscription = await tx.subscription.create({
      data: {
        kid: { connect: { id: kidId } },
        plan: { connect: { id: planId } },
        startDate,
        endDate,
        price: plan.price,
        discountPercentage,
        amountPaid,
        status: SubscriptionStatus.ACTIVE,
      },
    });

    // 3️⃣ Add the net amount to the kid’s loanBalance
    await tx.kid.update({
      where: { id: kidId },
      data: { loanBalance: { increment: plan.price - amountPaid } },
    });

    return subscription;
  });

  return NextResponse.json({ data: newSub });
}
