import { NextRequest, NextResponse } from "next/server";
import { GetExpenseSchemaType } from "../_dto/gets-expense.dto";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import getDayRange from "@/backend/helpers/getDayRange";

export async function getExpenses(_: NextRequest, dto: GetExpenseSchemaType) {
  const {
    search,
    startDate,
    endDate,
    isPaymentPending,
    pageIndex = 0,
    pageSize = 10,
  } = dto;

  const filters: Prisma.ExpenseWhereInput = {};

  if (startDate && endDate) {
    const { startOfDay } = getDayRange(startDate);
    const { startOfNextDay: endOfNextDay } = getDayRange(endDate);

    filters.date = {
      gte: startOfDay,
      lt: endOfNextDay,
    };
  }
  if (isPaymentPending) {
    //here i want to subtract the paid amount from the total amount
    // if amount - paidAmount > 0 then it is pending
    filters.amountDue = {
      gt: 0,
    };
  }

  if (search) {
    filters.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const expenses = await prisma.expense.findMany({
    skip: pageIndex * pageSize,
    take: pageSize,
    where: filters,
    orderBy: [{ date: "desc" }, { id: "desc" }],
  });

  return NextResponse.json({
    data: expenses,
    pagination: {
      pageIndex,
      pageSize,
      total: expenses.length,
      totalPages: Math.ceil(expenses.length / pageSize),
    },
  });
}
