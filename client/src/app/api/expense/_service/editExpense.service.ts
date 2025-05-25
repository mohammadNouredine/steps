import { NextRequest, NextResponse } from "next/server";
import { EditExpenseSchemaType } from "../_dto/mutate-expense.dto";
import prisma from "@/lib/db";

export async function editExpense(_: NextRequest, dto: EditExpenseSchemaType) {
  const { title, description, amount, paidAmount, date, id } = dto;

  const expense = await prisma.expense.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      amount,
      paidAmount,
      date,
      amountDue: amount - paidAmount,
    },
  });

  return NextResponse.json({ data: expense });
}
