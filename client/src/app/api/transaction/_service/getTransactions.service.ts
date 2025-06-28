import { NextRequest, NextResponse } from "next/server";
import {
  GetTransactionSchemaType,
  ReturnedTransactionResponse,
} from "../_dto/gets-transaction.dto";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import getDayRange from "@/backend/helpers/getDayRange";

export async function getTransactions(
  _: NextRequest,
  dto: GetTransactionSchemaType
) {
  const {
    search,
    startDate,
    endDate,
    kidId,
    userId,
    pageIndex = 0,
    pageSize = 10,
  } = dto;

  const filters: Prisma.TransactionWhereInput = {};

  if (startDate && endDate) {
    const { startOfDay } = getDayRange(startDate);
    const { startOfNextDay: endOfNextDay } = getDayRange(endDate);

    filters.transactionDate = {
      gte: startOfDay,
      lt: endOfNextDay,
    };
  }

  if (kidId) {
    filters.kidId = kidId;
  }

  if (userId) {
    filters.userId = userId;
  }

  if (search) {
    filters.OR = [
      {
        Kid: {
          firstName: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        Kid: {
          lastName: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        User: {
          username: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        note: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const transactions = await prisma.transaction.findMany({
    skip: pageIndex * pageSize,
    take: pageSize,
    where: filters,
    include: {
      Kid: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      User: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: [{ transactionDate: "desc" }, { id: "desc" }],
  });

  const totalTransactionsLength = await prisma.transaction.count({
    where: filters,
  });

  // Calculate summary
  const summary = await prisma.transaction.aggregate({
    _count: {
      id: true,
    },
    _sum: {
      exchangeOfLoans: true,
    },
    where: filters,
  });

  // Calculate positive and negative exchanges
  const positiveExchanges = await prisma.transaction.aggregate({
    _sum: {
      exchangeOfLoans: true,
    },
    where: {
      ...filters,
      exchangeOfLoans: {
        gt: 0,
      },
    },
  });

  const negativeExchanges = await prisma.transaction.aggregate({
    _sum: {
      exchangeOfLoans: true,
    },
    where: {
      ...filters,
      exchangeOfLoans: {
        lt: 0,
      },
    },
  });

  const res: ReturnedTransactionResponse = {
    data: transactions,
    summary: {
      totalTransactions: summary._count.id ?? 0,
      totalExchangeAmount: summary._sum.exchangeOfLoans ?? 0,
      totalPositiveExchange: positiveExchanges._sum.exchangeOfLoans ?? 0,
      totalNegativeExchange: negativeExchanges._sum.exchangeOfLoans ?? 0,
    },
    pagination: {
      pageIndex,
      pageSize,
      totalCount: totalTransactionsLength,
      pageCount: transactions.length,
      totalPages: Math.ceil(totalTransactionsLength / pageSize),
    },
  };
  return NextResponse.json(res);
}
