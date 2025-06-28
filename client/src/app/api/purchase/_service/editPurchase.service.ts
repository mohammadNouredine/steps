import { NextRequest, NextResponse } from "next/server";
import { EditPurchaseDto } from "../_dto/mutatePurchase.dto";
import prisma from "@/lib/db";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function editPurchase(
  req: NextRequest,
  dto: EditPurchaseDto,
  id: number
) {
  const { kidId, attendanceId, purchaseDate, note, totalPrice, paidAmount } =
    dto;

  const updated = await prisma.$transaction(async (tx) => {
    // fetch the existing purchase
    const old = await tx.purchasedItem.findUnique({
      where: { id },
      include: {
        kid: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    if (!old) throw new Error("Purchase not found");

    // compute unpaid before and after
    const oldUnpaid = old.totalPrice - old.paidAmount;
    const newUnpaid = totalPrice - paidAmount;
    const diff = newUnpaid - oldUnpaid;

    // update the purchase record
    const item = await tx.purchasedItem.update({
      where: { id },
      data: {
        kidId,
        attendanceId,
        purchaseDate,
        note,
        totalPrice,
        paidAmount,
      },
    });

    // adjust the loanBalance by the difference
    if (diff !== 0) {
      await tx.kid.update({
        where: { id: old.kidId },
        data: { loanBalance: { increment: diff } },
      });
    }

    return { item, old, kid: old.kid };
  });

  // Log the transaction after successful purchase update
  try {
    const userId = getLoggedInUserId({ req });
    if (userId) {
      const oldUnpaid = updated.old.totalPrice - updated.old.paidAmount;
      const newUnpaid = totalPrice - paidAmount;

      await KidTransactionService.logPurchaseUpdate(
        kidId,
        userId,
        id,
        updated.old.totalPrice,
        totalPrice,
        updated.old.paidAmount,
        paidAmount,
        {
          oldPurchaseDate: updated.old.purchaseDate,
          newPurchaseDate: purchaseDate,
          oldNote: updated.old.note,
          newNote: note,
          oldUnpaid,
          newUnpaid,
          unpaidDifference: newUnpaid - oldUnpaid,
          attendanceId,
          kidName: `${updated.kid.firstName} ${updated.kid.lastName}`,
        }
      );
    }
  } catch (transactionError) {
    console.error(
      "Failed to log purchase update transaction:",
      transactionError
    );
    // Don't fail the main operation if transaction logging fails
  }

  return NextResponse.json(
    { message: "Purchase edited successfully", purchase: updated.item },
    { status: 200 }
  );
}
