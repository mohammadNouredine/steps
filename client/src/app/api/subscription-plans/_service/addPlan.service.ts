import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { AddPlanDto } from "../_dto/add-edit-plan.dto.ts";
export async function addPlan(req: NextRequest, data: AddPlanDto) {
  console.log("REQUEST", req);
  const { name, description, price, duration, billingMode } = data;
  const existingPlan = await prisma.subscriptionPlan.findFirst({
    where: { name },
  });

  if (existingPlan) {
    return NextResponse.json(
      { message: "Plan already exists" },
      { status: 400 }
    );
  }

  const plan = await prisma.subscriptionPlan.create({
    data: { name, description, price, duration, billingMode },
  });

  if (!plan)
    return NextResponse.json(
      { message: "Failed to create plan" },
      { status: 500 }
    );

  return NextResponse.json(
    { message: "Plan created successfully" },
    { status: 200 }
  );
}
