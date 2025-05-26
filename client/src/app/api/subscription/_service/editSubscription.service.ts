// app/api/subscriptions/_service/editSubscription.service.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { EditSubscriptionSchemaType } from "../_dto/mutate-subscription.dto";
import { SubscriptionStatus } from "@prisma/client";

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
  } = dto;

  const updated = await prisma.$transaction(async (tx) => {
    const sub = await tx.subscription.findUnique({
      where: { id },
      include: { plan: true },
    });
    if (!sub) throw new Error("Subscription not found");

    let loanAdjust = 0;
    const now = new Date();

    // 🔄 PLAN CHANGE
    if (newPlanId && newPlanId !== sub.planId) {
      // refund the unused days of the old plan
      const attendCount = await tx.attendance.count({
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

      // cancel old
      await tx.subscription.update({
        where: { id },
        data: { status: SubscriptionStatus.CANCELLED, endDate: now },
      });
      loanAdjust -= refund;

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

      // overwrite the same record to become a “new” subscription
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
      loanAdjust += newPlan.price - (newPaid ?? sub.amountPaid);
      return up;
    }

    // 🔄 STATUS CHANGE (e.g. CANCELLED)
    if (newStatus && newStatus !== sub.status) {
      if (newStatus === SubscriptionStatus.CANCELLED) {
        // refund unused days
        const attendCount = await tx.attendance.count({
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
      await tx.subscription.update({
        where: { id },
        data: { startDate: start, endDate: end ?? undefined },
      });
    }

    // 4️⃣ Apply any loanBalance adjustments
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
