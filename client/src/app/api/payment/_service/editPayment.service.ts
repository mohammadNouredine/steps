import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { EditPaymentSchemaType } from "../_dto/mutate-payment.dto";

export async function editPayment(_: NextRequest, dto: EditPaymentSchemaType) {
  const { amount, id, kidId, paymentDate, note } = dto;

  // Fetch the previous payment to calculate the difference
  const previousPayment = await prisma.payment.findUnique({
    where: { id },
  });

  if (!previousPayment) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

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
  await prisma.kid.update({
    where: { id: kidId },
    data: {
      loanBalance: {
        decrement: amount, // Update the loan balance with the new amount
      },
    },
  });

  return NextResponse.json({ data: updatedPayment });
}
