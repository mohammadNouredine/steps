import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function deletePayment(id: number) {
  // Get the payment to be deleted
  const payment = await prisma.payment.findUnique({
    where: { id },
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

  return NextResponse.json({ data: payment, kid: updatedKid });
}
