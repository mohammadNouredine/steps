import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function deletePlan(req: Request, id: number) {
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
