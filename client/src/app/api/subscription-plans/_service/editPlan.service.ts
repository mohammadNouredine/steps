import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export async function editPlan(req: Request, id: number) {
  const { name, description, price, duration } = await req.json();

  const plan = await prisma.subscriptionPlan.update({
    where: { id },
    data: { name, description, price, duration },
  });

  if (!plan)
    return NextResponse.json({ message: "Plan not found" }, { status: 404 });

  return NextResponse.json(
    { message: "Plan updated successfully" },
    { status: 200 }
  );
}
