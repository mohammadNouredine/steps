import { NextRequest, NextResponse } from "next/server";
import { GetPurchasesSchemaType } from "../_dto/getsPurchase.dto";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import getDayRange from "@/backend/helpers/getDayRange";

export async function getPurchases(
  _: NextRequest,
  dto: GetPurchasesSchemaType
) {
  const { pageIndex = 0, pageSize = 10, search, kidId, date } = dto;

  const filters: Prisma.PurchasedItemWhereInput = {};

  if (search) {
    filters.note = {
      contains: search,
      mode: "insensitive", // optional for case-insensitive search
    };
  }

  if (kidId) {
    filters.kidId = kidId;
  }

  if (date) {
    const { startOfDay, startOfNextDay } = getDayRange(date);
    filters.purchaseDate = {
      gte: startOfDay,
      lt: startOfNextDay,
    };
  }

  // Get total count for pagination
  const total = await prisma.purchasedItem.count({
    where: filters,
  });

  // Get paginated data
  const purchases = await prisma.purchasedItem.findMany({
    skip: pageIndex * pageSize,
    take: pageSize,
    where: filters,
    include: {
      kid: true,
    },
  });

  return NextResponse.json({
    data: purchases,
    pagination: {
      pageIndex,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}
