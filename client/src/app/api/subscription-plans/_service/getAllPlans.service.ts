import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export async function getAllPlans() {
  const plans = await prisma.subscriptionPlan.findMany();

  return NextResponse.json(plans, { status: 200 });
}
