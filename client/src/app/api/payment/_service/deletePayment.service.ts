import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function deletePayment(req: NextRequest, id: number) {
  // Get the payment to be deleted
  const payment = await prisma.payment.findUnique({
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

  if (!payment) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  // Delete the payment
  await prisma.payment.delete({
    where: {
      id,
    },
  });

  // Update the kid's loan balance (increase by the payment amount)
  const updatedKid = await prisma.kid.update({
    where: { id: payment.kidId },
    data: {
      loanBalance: {
        increment: payment.amount, // Revert the loan balance change
      },
    },
  });

  // Log the transaction after successful payment deletion
  try {
    const userId = getLoggedInUserId({ req });
    if (userId) {
      await KidTransactionService.logPaymentDeletion(
        payment.kidId,
        userId,
        id, // Use the original payment ID for reference
        payment.amount,
        {
          paymentDate: payment.paymentDate,
          note: payment.note,
          kidName: `${payment.kid.firstName} ${payment.kid.lastName}`,
        }
      );
    }
  } catch (transactionError) {
    console.error(
      "Failed to log payment deletion transaction:",
      transactionError
    );
    // Don't fail the main operation if transaction logging fails
  }

  return NextResponse.json({ data: payment, kid: updatedKid });
}
