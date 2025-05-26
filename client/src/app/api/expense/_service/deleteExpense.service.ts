import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function deleteExpense(id: number) {
  const expense = await prisma.expense.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ data: expense });
}
