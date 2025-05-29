import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { AddPurchaseDto } from "../_dto/mutatePurchase.dto";

export async function addPurchase(_: NextRequest, data: AddPurchaseDto) {
  const { kidId, attendanceId, purchaseDate, note, totalPrice, paidAmount } =
    data;

  // compute unpaid portion
  const unpaidAmount = totalPrice - paidAmount;

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

    return item;
  });

  return NextResponse.json(
    { message: "Purchase added successfully", purchase: created },
    { status: 200 }
  );
}
