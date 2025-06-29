import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { AddPurchaseDto } from "../_dto/mutatePurchase.dto";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function addPurchase(req: NextRequest, data: AddPurchaseDto) {
  const { kidId, attendanceId, purchaseDate, note, totalPrice, paidAmount } =
    data;

  // compute unpaid portion
  const unpaidAmount = totalPrice - paidAmount;

  // Get kid's current loan balance BEFORE making changes
  const kidBefore = await prisma.kid.findUnique({
    where: { id: kidId },
    select: { loanBalance: true, firstName: true, lastName: true },
  });

  if (!kidBefore) {
    return NextResponse.json({ error: "Kid not found" }, { status: 404 });
  }

  const loanBalanceBefore = kidBefore.loanBalance;
  const loanBalanceAfter = loanBalanceBefore + unpaidAmount;

  // wrap in a transaction
  const created = await prisma.$transaction(async (tx) => {
    // ensure kid exists
    const kid = await tx.kid.findUnique({ where: { id: kidId } });
    if (!kid) throw new Error("Kid not found");

    // create the purchase
    const item = await tx.purchasedItem.create({
      data: {
        kidId,
        attendanceId,
        purchaseDate,
        note,
        totalPrice,
        paidAmount,
      },
    });

    // bump the kid's loanBalance by only the unpaid amount
    if (unpaidAmount !== 0) {
      await tx.kid.update({
        where: { id: kidId },
        data: { loanBalance: { increment: unpaidAmount } },
      });
    }

    return { item, kid };
  });

  // Log the transaction after successful purchase creation
  try {
    const userId = getLoggedInUserId({ req });
    if (userId) {
      await KidTransactionService.createTransaction({
        kidId,
        userId,
        actionType: "PURCHASE_CREATE",
        operationType: "CREATE",
        transactionAmount: totalPrice,
        loanBalanceBefore,
        loanBalanceAfter,
        description: `Purchase created - Total: ${totalPrice}, Paid: ${paidAmount}, Unpaid: ${unpaidAmount}`,
        metadata: {
          totalPrice,
          paidAmount,
          unpaidAmount,
          purchaseDate,
          note,
          attendanceId,
          kidName: `${created.kid.firstName} ${created.kid.lastName}`,
        },
        relatedPurchaseId: created.item.id,
      });
    }
  } catch (transactionError) {
    console.error(
      "Failed to log purchase creation transaction:",
      transactionError
    );
    // Don't fail the main operation if transaction logging fails
  }

  return NextResponse.json({
    message: "Purchase added successfully",
    purchase: created.item,
  });
}
