// app/api/subscriptions/_service/getSubscriptions.service.ts
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { GetSubscriptionsSchemaType } from "../_dto/get-subscriptions.dto";

export async function getSubscriptions(
  _: NextRequest,
  dto: GetSubscriptionsSchemaType
) {
  const { kidId, status, lastId } = dto;

  const where: Prisma.SubscriptionWhereInput = {};
  if (kidId) where.kidId = kidId;
  if (status) where.status = status;
  if (lastId) where.id = { lt: lastId };

  const pageSize = 20;
  const subscriptions = await prisma.subscription.findMany({
    where,
    include: { plan: true },
    orderBy: [{ id: "desc" }],
    take: pageSize,
  });

  const nextLastId =
    subscriptions.length > 0
      ? subscriptions[subscriptions.length - 1].id
      : null;
  const total = await prisma.subscription.count({ where });

  return NextResponse.json({ data: subscriptions, lastId: nextLastId, total });
}
