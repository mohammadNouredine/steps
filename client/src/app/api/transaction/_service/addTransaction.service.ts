import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { AddTransactionSchemaType } from "../_dto/mutate-transaction.dto";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function addTransaction(
  req: NextRequest,
  dto: AddTransactionSchemaType
) {
  const { kidId, newLoanBalance, note } = dto;

  // Get user ID from the request
  const userId = getLoggedInUserId({ req });
  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  // Get the current kid data
  const currentKid = await prisma.kid.findUnique({
    where: { id: kidId },
    select: { loanBalance: true, firstName: true, lastName: true },
  });

  if (!currentKid) {
    return NextResponse.json({ error: "Kid not found" }, { status: 404 });
  }

  const loanBalanceBefore = currentKid.loanBalance;
  const exchangeOfLoans = newLoanBalance - loanBalanceBefore;

  // Use transaction to ensure data consistency
  const result = await prisma.$transaction(async (tx) => {
    // Update kid's loan balance
    const updatedKid = await tx.kid.update({
      where: { id: kidId },
      data: { loanBalance: newLoanBalance },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        loanBalance: true,
      },
    });

    // Create transaction record
    const transaction = await tx.transaction.create({
      data: {
        kidId,
        userId: Number(userId),
        loanBalanceBeforeTransaction: loanBalanceBefore,
        loanBalanceAfterTransaction: newLoanBalance,
        exchangeOfLoans,
        note,
      },
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
    });

    return { updatedKid, transaction };
  });

  return NextResponse.json({
    data: result,
    message: `Loan balance updated successfully for ${currentKid.firstName} ${currentKid.lastName}`,
  });
}
