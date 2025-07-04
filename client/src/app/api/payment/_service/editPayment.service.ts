import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { EditPaymentSchemaType } from "../_dto/mutate-payment.dto";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function editPayment(
  req: NextRequest,
  dto: EditPaymentSchemaType
) {
  const { amount, id, kidId, paymentDate, note } = dto;

  // Fetch the previous payment to calculate the difference
  const previousPayment = await prisma.payment.findUnique({
    where: { id },
  });

  if (!previousPayment) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  // Get kid's current loan balance BEFORE making changes
  const kidBefore = await prisma.kid.findUnique({
    where: { id: kidId },
    select: { loanBalance: true, firstName: true, lastName: true },
  });

  if (!kidBefore) {
    return NextResponse.json({ error: "Kid not found" }, { status: 404 });
  }

  const loanBalanceBefore = kidBefore.loanBalance;
  const amountDifference = amount - previousPayment.amount;
  const loanBalanceAfter = loanBalanceBefore - amountDifference;

  // Revert the previous loan balance update
  await prisma.kid.update({
    where: { id: kidId },
    data: {
      loanBalance: {
        increment: previousPayment.amount, // Undo the previous payment impact
      },
    },
  });

  // Update the payment
  const updatedPayment = await prisma.payment.update({
    where: { id },
    data: {
      amount,
      paymentDate,
      note,
    },
  });

  // Adjust the kid's loan balance based on the new payment amount
  const updatedKid = await prisma.kid.update({
    where: { id: kidId },
    data: {
      loanBalance: {
        decrement: amount, // Update the loan balance with the new amount
      },
    },
  });

  // Log the transaction after successful payment update
  try {
    const userId = getLoggedInUserId({ req });
    if (userId) {
      await KidTransactionService.createTransaction({
        kidId,
        userId,
        actionType: "PAYMENT_UPDATE",
        operationType: "UPDATE",
        transactionAmount: Math.abs(amountDifference),
        loanBalanceBefore,
        loanBalanceAfter,
        description: `Payment updated from ${previousPayment.amount} to ${amount}`,
        metadata: {
          oldAmount: previousPayment.amount,
          newAmount: amount,
          oldPaymentDate: previousPayment.paymentDate,
          newPaymentDate: paymentDate,
          oldNote: previousPayment.note,
          newNote: note,
          kidName: `${updatedKid.firstName} ${updatedKid.lastName}`,
        },
        relatedPaymentId: updatedPayment.id,
      });
    }
  } catch (transactionError) {
    console.error(
      "Failed to log payment update transaction:",
      transactionError
    );
    // Don't fail the main operation if transaction logging fails
  }

  return NextResponse.json({ data: updatedPayment });
}
