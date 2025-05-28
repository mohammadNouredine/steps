import { CustomErrorResponse } from "@/backend/helpers/customErrorResponse";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function deletePlan(id: number) {
  console.log("THE ID IS", id);
  const assosiatedSubscription = await prisma.subscription.findFirst({
    where: {
      planId: id,
    },
    select: {
      id: true,
    },
  });
  if (assosiatedSubscription) {
    return CustomErrorResponse("Cannot delete plan, subscriptions exist", 400);
  }
  const plan = await prisma.subscriptionPlan.delete({
    where: { id },
  });
  if (!plan)
    return NextResponse.json({ message: "Plan not found" }, { status: 404 });
  return NextResponse.json(
    { message: "Plan deleted successfully" },
    { status: 200 }
  );
}
