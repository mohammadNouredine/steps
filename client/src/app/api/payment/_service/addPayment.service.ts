import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { AddPaymentSchemaType } from "../_dto/mutate-payment.dto";
import { CustomErrorResponse } from "@/backend/helpers/customErrorResponse";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function addPayment(req: NextRequest, dto: AddPaymentSchemaType) {
  const { kidId, amount, paymentDate, note } = dto;

  // Create the payment
  const payment = await prisma.payment.create({
    data: {
      kidId,
      amount,
      paymentDate,
      note,
    },
  });

  if (!payment) return CustomErrorResponse("Payment not created", 400);

  // Update the kid's loan balance
  const kid = await prisma.kid.update({
    where: { id: kidId },
    data: {
      loanBalance: {
        decrement: amount, // Reduce loan balance by payment amount
      },
    },
  });

  // Log the transaction after successful payment creation
  try {
    const userId = getLoggedInUserId({ req });
    if (userId) {
      await KidTransactionService.logPaymentCreation(
        kidId,
        userId,
        payment.id,
        amount,
        {
          paymentDate,
          note,
          kidName: `${kid.firstName} ${kid.lastName}`,
        }
      );
    }
  } catch (transactionError) {
    console.error("Failed to log payment transaction:", transactionError);
    // Don't fail the main operation if transaction logging fails
  }

  return NextResponse.json({ data: payment, kid });
}
