import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import getDayRange from "@/backend/helpers/getDayRange";
import { GetPaymentSchemaType } from "../_dto/gets-payment.dto";

export async function getPayments(_: NextRequest, dto: GetPaymentSchemaType) {
  const { search, startDate, endDate, pageIndex = 0, pageSize = 10 } = dto;

  const filters: Prisma.PaymentWhereInput = {};

  if (startDate && endDate) {
    const { startOfDay } = getDayRange(startDate);
    const { startOfNextDay: endOfNextDay } = getDayRange(endDate);

    filters.paymentDate = {
      gte: startOfDay,
      lt: endOfNextDay,
    };
  }

  if (search) {
    filters.OR = [
      {
        note: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const payments = await prisma.payment.findMany({
    skip: pageIndex * pageSize,
    take: pageSize,
    where: filters,
    orderBy: [{ paymentDate: "desc" }, { id: "desc" }],
  });

  const totalPaymentsLength = await prisma.payment.count({ where: filters });

  return NextResponse.json({
    data: payments,
    pagination: {
      pageIndex,
      pageSize,
      total: totalPaymentsLength,
      totalPages: Math.ceil(totalPaymentsLength / pageSize),
    },
  });
}
