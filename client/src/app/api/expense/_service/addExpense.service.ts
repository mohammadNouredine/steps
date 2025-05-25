import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { AddExpenseSchemaType } from "../_dto/mutate-expense.dto";

export async function addExpense(_: NextRequest, dto: AddExpenseSchemaType) {
  const { title, description, amount, paidAmount, date } = dto;
  const expense = await prisma.expense.create({
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
