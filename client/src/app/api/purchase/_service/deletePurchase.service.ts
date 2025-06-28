import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function deletePurchase(req: Request, id: number) {
  const deletedData = await prisma.$transaction(async (tx) => {
    // fetch to know how much to decrement
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

    const unpaid = old.totalPrice - old.paidAmount;

    // delete the purchase
    await tx.purchasedItem.delete({ where: { id } });

    // subtract the unpaid portion from loanBalance
    if (unpaid !== 0) {
      await tx.kid.update({
        where: { id: old.kidId },
        data: { loanBalance: { decrement: unpaid } },
      });
    }

    return { old, kid: old.kid };
  });

  // Log the transaction after successful purchase deletion
  try {
    const userId = getLoggedInUserId({ req });
    if (userId) {
      const unpaid = deletedData.old.totalPrice - deletedData.old.paidAmount;

      await KidTransactionService.logPurchaseDeletion(
        deletedData.old.kidId,
        userId,
        id,
        deletedData.old.totalPrice,
        deletedData.old.paidAmount,
        {
          purchaseDate: deletedData.old.purchaseDate,
          note: deletedData.old.note,
          unpaidAmount: unpaid,
          attendanceId: deletedData.old.attendanceId,
          kidName: `${deletedData.kid.firstName} ${deletedData.kid.lastName}`,
        }
      );
    }
  } catch (transactionError) {
    console.error(
      "Failed to log purchase deletion transaction:",
      transactionError
    );
    // Don't fail the main operation if transaction logging fails
  }

  return NextResponse.json(
    { message: "Purchase deleted successfully" },
    { status: 200 }
  );
}
