import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { EditPlanDto } from "../_dto/add-edit-plan.dto.ts";
export async function editPlan(data: EditPlanDto, id: number) {
  console.log("NEW DATA IS", data);
  const { name, description, price, duration } = data;

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
