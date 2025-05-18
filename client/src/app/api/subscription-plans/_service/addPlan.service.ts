import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export async function addPlan(req: Request) {
  const { name, description, price, duration } = await req.json();

  const plan = await prisma.subscriptionPlan.create({
    data: { name, description, price, duration },
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
