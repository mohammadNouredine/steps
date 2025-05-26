import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { EditSubscriptionSchemaType } from "../_dto/mutate-subscription.dto";
import { SubscriptionStatus, BillingMode } from "@prisma/client";
import getDayRange from "@/backend/helpers/getDayRange";

export async function editSubscription(
  _: NextRequest,
  dto: EditSubscriptionSchemaType
) {
  const {
    id,
    planId: newPlanId,
    startDate: rawStart,
    amountPaid: newPaid,
    discountPercentage: newDisc,
    status: newStatus,
    endDate,
  } = dto;

  const updated = await prisma.$transaction(async (tx) => {
    const sub = await tx.subscription.findUnique({
      where: { id },
      include: { plan: true },
    });
    if (!sub) throw new Error("Subscription not found");

    let loanAdjust = 0;
    const now = new Date();

    // Helper fn: count attendances for usage plans
    async function countAttendances(kidId: number, startDate: Date) {
      return tx.attendance.count({
        where: {
          kidId,
          date: {
            gte: startDate.toISOString().slice(0, 10),
            lte: now.toISOString().slice(0, 10),
          },
        },
      });
    }

    // 🔄 PLAN CHANGE
    if (newPlanId && newPlanId !== sub.planId) {
      // Refund depends on billing mode of old plan
      if (sub.plan.billingMode === BillingMode.PREPAID) {
        const attendCount = await countAttendances(sub.kidId, sub.startDate);
        const usedAmount = (sub.plan.price / sub.plan.duration) * attendCount;
        const refund = sub.plan.price - usedAmount;
        loanAdjust -= refund;
      } else if (sub.plan.billingMode === BillingMode.USAGE) {
        // For usage, refund all loanBalance related to attendances for this subscription period if needed
        // For simplicity, refund the full subscription price minus amountPaid
        // (You can customize based on attendance count if you track this separately)
        loanAdjust -= sub.price - sub.amountPaid;
      }

      // Cancel old subscription
      await tx.subscription.update({
        where: { id },
        data: { status: SubscriptionStatus.CANCELLED, endDate: now },
      });

      const newPlan = await tx.subscriptionPlan.findUnique({
        where: { id: newPlanId },
      });
      if (!newPlan) throw new Error("New plan not found");

      const start = rawStart ? new Date(rawStart) : sub.startDate;
      const end =
        newPlan.duration > 1
          ? new Date(
              start.valueOf() + (newPlan.duration - 1) * 24 * 60 * 60 * 1000
            )
          : null;

      // Overwrite as “new” subscription with new plan
      const up = await tx.subscription.update({
        where: { id },
        data: {
          plan: { connect: { id: newPlanId } },
          startDate: start,
          endDate: end ?? undefined,
          price: newPlan.price,
          discountPercentage: newDisc ?? sub.discountPercentage,
          amountPaid: newPaid ?? sub.amountPaid,
          status: newStatus ?? SubscriptionStatus.ACTIVE,
        },
      });

      // Adjust loanBalance for new plan billing mode
      if (newPlan.billingMode === BillingMode.PREPAID) {
        loanAdjust += newPlan.price - (newPaid ?? sub.amountPaid);
      }
      // For USAGE mode, no immediate loan adjustment here

      return up;
    }

    // 🔄 STATUS CHANGE
    if (newStatus && newStatus !== sub.status) {
      if (newStatus === SubscriptionStatus.CANCELLED) {
        if (sub.plan.billingMode === BillingMode.PREPAID) {
          const attendCount = await countAttendances(sub.kidId, sub.startDate);
          const usedAmount = (sub.plan.price / sub.plan.duration) * attendCount;
          const refund = sub.plan.price - usedAmount;
          loanAdjust -= refund;
        } else if (sub.plan.billingMode === BillingMode.USAGE) {
          loanAdjust -= sub.price - sub.amountPaid;
        }

        await tx.subscription.update({
          where: { id },
          data: { status: newStatus, endDate: now },
        });
      } else {
        await tx.subscription.update({
          where: { id },
          data: { status: newStatus },
        });
      }
    }

    // 🔄 PAYMENT ADJUSTMENT
    if (newPaid !== undefined && newPaid !== sub.amountPaid) {
      const delta = newPaid - sub.amountPaid;
      loanAdjust -= delta;
      await tx.subscription.update({
        where: { id },
        data: { amountPaid: newPaid },
      });
    }

    // 🔄 DISCOUNT ADJUSTMENT
    if (newDisc !== undefined && newDisc !== sub.discountPercentage) {
      await tx.subscription.update({
        where: { id },
        data: { discountPercentage: newDisc },
      });
    }

    // 🔄 START DATE CHANGE
    if (rawStart) {
      const start = new Date(rawStart);
      let end = sub.endDate;
      if (sub.plan.duration > 1) {
        end = new Date(
          start.valueOf() + (sub.plan.duration - 1) * 24 * 60 * 60 * 1000
        );
      }
      const { startOfDay: startOfStartDate } = getDayRange(start.toISOString());
      const { startOfNextDay: endOfEndDate } = getDayRange(
        endDate?.toISOString() || end?.toISOString() || ""
      );

      await tx.subscription.update({
        where: { id },
        data: {
          startDate: startOfStartDate,
          endDate: endOfEndDate,
        },
      });
    }

    // Apply loan adjustments if any
    if (loanAdjust !== 0) {
      await tx.kid.update({
        where: { id: sub.kidId },
        data: { loanBalance: { increment: loanAdjust } },
      });
    }

    return tx.subscription.findUnique({
      where: { id },
      include: { plan: true },
    });
  });

  return NextResponse.json({ data: updated });
}
