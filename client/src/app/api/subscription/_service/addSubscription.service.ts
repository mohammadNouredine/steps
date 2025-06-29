import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { AddSubscriptionSchemaType } from "../_dto/mutate-subscription.dto";
import { SubscriptionStatus } from "@prisma/client";
import getDayRange from "@/backend/helpers/getDayRange";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function addSubscription(
  req: NextRequest,
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

  // 1️⃣ validate kid
  const kid = await prisma.kid.findUnique({ where: { id: kidId } });
  if (!kid) {
    return NextResponse.json({ message: "Kid not found" }, { status: 404 });
  }

  // Get kid's current loan balance BEFORE making changes
  const loanBalanceBefore = kid.loanBalance;

  // 2️⃣ validate plan
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
  let payment = null;
  if (amountPaid > 0) {
    payment = await prisma.payment.create({
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

  let loanBalanceAfter = loanBalanceBefore;
  if (plan.billingMode === "PREPAID") {
    // charge full plan price now
    await prisma.kid.update({
      where: { id: kidId },
      data: { loanBalance: { increment: discountedPlanPrice - amountPaid } },
    });
    loanBalanceAfter = loanBalanceBefore + (discountedPlanPrice - amountPaid);
  }
  // else USAGE: we'll bill on attendance

  // Log the transaction after successful subscription creation
  try {
    const userId = getLoggedInUserId({ req });
    if (userId) {
      await KidTransactionService.createTransaction({
        kidId,
        userId,
        actionType: "SUBSCRIPTION_CREATE",
        operationType: "CREATE",
        transactionAmount: plan.price,
        discountAmount: (plan.price * (discountPercentage || 0)) / 100,
        loanBalanceBefore,
        loanBalanceAfter,
        description: `Subscription created with ${
          discountPercentage ? discountPercentage + "% discount" : "no discount"
        }`,
        metadata: {
          planName: plan.name,
          planDuration: plan.duration,
          startDate: startOfStartDate,
          endDate: endOfEndDate,
          amountPaid,
          billingMode: plan.billingMode,
          discountedPrice: discountedPlanPrice,
          kidName: `${kid.firstName} ${kid.lastName}`,
          paymentId: payment?.id,
        },
        relatedSubscriptionId: subscription.id,
      });
    }
  } catch (transactionError) {
    console.error(
      "Failed to log subscription creation transaction:",
      transactionError
    );
    // Don't fail the main operation if transaction logging fails
  }

  return NextResponse.json({
    data: subscription,
    message: "Subscription created successfully",
  });
}
