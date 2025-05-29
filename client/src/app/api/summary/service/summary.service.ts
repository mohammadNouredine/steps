import { NextRequest, NextResponse } from "next/server";
import { GetSummarySchemaType, SummaryResponse } from "../dto/summary.dto";
import { Prisma } from "@prisma/client";
import getDayRange from "@/backend/helpers/getDayRange";
import prisma from "@/lib/db";

export async function getSummary(_: NextRequest, dto: GetSummarySchemaType) {
  const { startDate, endDate, isPaymentPending } = dto;

  // Build filters for expenses
  const expenseFilters: Prisma.ExpenseWhereInput = {};

  if (startDate && endDate) {
    const { startOfDay } = getDayRange(startDate);
    const { startOfNextDay: endOfNextDay } = getDayRange(endDate);
    expenseFilters.date = {
      gte: startOfDay,
      lt: endOfNextDay,
    };
  }

  if (isPaymentPending) {
    // Only expenses where amountDue > 0 (unpaid)
    expenseFilters.amountDue = {
      gt: 0,
    };
  }

  // You could add filters for payments, loans, purchased items similarly if needed
  // For now, we just get totals globally

  // 1. Expenses summary filtered by dates + isPaymentPending
  const expenseSummary = await prisma.expense.aggregate({
    _sum: {
      amount: true,
      paidAmount: true,
      amountDue: true,
    },
    where: expenseFilters,
  });

  // 2. Total payments (can also be filtered by date range if needed)
  const paymentsFilters: Prisma.PaymentWhereInput = {};
  if (startDate && endDate) {
    const { startOfDay } = getDayRange(startDate);
    const { startOfNextDay: endOfNextDay } = getDayRange(endDate);
    paymentsFilters.paymentDate = {
      gte: startOfDay,
      lt: endOfNextDay,
    };
  }
  const paymentsSummary = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: paymentsFilters,
  });

  // 3. Loans total (sum of kids' loanBalance), optionally filter kids by joined date
  const loansFilters: Prisma.KidWhereInput = {};
  if (startDate && endDate) {
    const { startOfDay } = getDayRange(startDate);
    const { startOfNextDay: endOfNextDay } = getDayRange(endDate);
    loansFilters.dateJoined = {
      gte: startOfDay,
      lt: endOfNextDay,
    };
  }
  const loansSummary = await prisma.kid.aggregate({
    _sum: {
      loanBalance: true,
    },
    where: loansFilters,
  });

  // 4. Purchased items totals (also optionally filtered by purchaseDate)
  const purchaseFilters: Prisma.PurchasedItemWhereInput = {};
  if (startDate && endDate) {
    const { startOfDay } = getDayRange(startDate);
    const { startOfNextDay: endOfNextDay } = getDayRange(endDate);
    purchaseFilters.purchaseDate = {
      gte: startOfDay,
      lt: endOfNextDay,
    };
  }
  const purchasedItemsSummary = await prisma.purchasedItem.aggregate({
    _sum: {
      totalPrice: true,
      paidAmount: true,
    },
    where: purchaseFilters,
  });

  const response: SummaryResponse = {
    expenses: {
      totalAmount: expenseSummary._sum.amount ?? 0,
      totalPaid: expenseSummary._sum.paidAmount ?? 0,
      totalDue: expenseSummary._sum.amountDue ?? 0,
    },
    payments: {
      totalPaid: paymentsSummary._sum.amount ?? 0,
    },
    loans: {
      totalLoanBalance: loansSummary._sum.loanBalance ?? 0,
    },
    purchasedItems: {
      totalPrice: purchasedItemsSummary._sum.totalPrice ?? 0,
      totalPaidAmount: purchasedItemsSummary._sum.paidAmount ?? 0,
    },
  };

  return NextResponse.json(response);
}
