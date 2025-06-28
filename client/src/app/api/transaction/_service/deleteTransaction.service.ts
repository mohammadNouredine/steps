import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function deleteTransaction(_: NextRequest, dto: { id: number }) {
  const { id } = dto;

  const transaction = await prisma.transaction.findUnique({
    where: { id },
    include: {
      Kid: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  if (!transaction) {
    return NextResponse.json(
      { error: "Transaction not found" },
      { status: 404 }
    );
  }

  await prisma.transaction.delete({
    where: { id },
  });

  return NextResponse.json({
    message: `Transaction deleted successfully for ${transaction.Kid.firstName} ${transaction.Kid.lastName}`,
  });
}
