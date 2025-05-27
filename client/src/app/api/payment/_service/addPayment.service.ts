import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { AddPaymentSchemaType } from "../_dto/mutate-payment.dto";

export async function addPayment(_: NextRequest, dto: AddPaymentSchemaType) {
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

  if (!payment) return NextResponse.json({ message: "Payment not created" });

  // Update the kid's loan balance
  const kid = await prisma.kid.update({
    where: { id: kidId },
    data: {
      loanBalance: {
        decrement: amount, // Reduce loan balance by payment amount
      },
    },
  });

  return NextResponse.json({ data: payment, kid });
}
