import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { AddSubscriptionSchemaType } from "../_dto/mutate-subscription.dto";
import { SubscriptionStatus } from "@prisma/client";
import getDayRange from "@/backend/helpers/getDayRange";

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
    endDate: sendedEndDate,
  } = dto;
  const startDate = rawStart ? new Date(rawStart) : new Date();

  // 1️⃣ validate kid & plan
  const kid = await prisma.kid.findUnique({ where: { id: kidId } });
  if (!kid) {
    return NextResponse.json({ message: "Kid not found" }, { status: 404 });
  }
  const plan = await prisma.subscriptionPlan.findUnique({
    where: { id: planId },
  });
  if (!plan) {
    return NextResponse.json({ message: "Plan not found" }, { status: 404 });
  }

  // 2️⃣ prevent multiple active
  const existing = await prisma.subscription.findFirst({
    where: { kidId, status: SubscriptionStatus.ACTIVE },
  });
  if (existing) {
    return NextResponse.json(
      { message: "Kid already has an active subscription" },
      { status: 400 }
    );
  }

  const endDate = sendedEndDate
    ? sendedEndDate
    : plan.duration > 1
    ? new Date(startDate.getTime() + (plan.duration - 1) * 86400000)
    : startDate;

  const { startOfDay: startOfStartDate } = getDayRange(startDate.toISOString());
  const { startOfNextDay: endOfEndDate } = getDayRange(
    sendedEndDate?.toISOString() || endDate.toISOString()
  );

  // 3️⃣ create subscription (no loan change yet)

  const subscription = await prisma.subscription.create({
    data: {
      kid: { connect: { id: kidId } },
      plan: { connect: { id: planId } },
      startDate: startOfStartDate,
      endDate: endOfEndDate,
      price: plan.price,
      discountPercentage,
      status: SubscriptionStatus.ACTIVE,
    },
  });

  // 4️⃣ create payment instead of adding paid for subscription
  if (amountPaid > 0) {
    await prisma.payment.create({
      data: {
        amount: amountPaid,
        paymentDate: new Date(),
        kid: { connect: { id: kidId } },
        note: "Subscription payment",
      },
    });
  }

  // 5️⃣ billing logic
  const disc = discountPercentage || 0;
  const discountedPlanPrice = plan.price * (1 - disc / 100);

  if (plan.billingMode === "PREPAID") {
    // charge full plan price now
    await prisma.kid.update({
      where: { id: kidId },
      data: { loanBalance: { increment: discountedPlanPrice - amountPaid } },
    });
  }
  // else USAGE: we'll bill on attendance

  return NextResponse.json({
    data: subscription,
    message: "Subscription created successfully",
  });
}
