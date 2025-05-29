import { NextRequest, NextResponse } from "next/server";
import { EditPurchaseDto } from "../_dto/mutatePurchase.dto";
import prisma from "@/lib/db";

export async function editPurchase(
  _: NextRequest,
  dto: EditPurchaseDto,
  id: number
) {
  const { kidId, attendanceId, purchaseDate, note, totalPrice, paidAmount } =
    dto;

  const updated = await prisma.$transaction(async (tx) => {
    // fetch the existing purchase
    const old = await tx.purchasedItem.findUnique({ where: { id } });
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

    return item;
  });

  return NextResponse.json(
    { message: "Purchase edited successfully", purchase: updated },
    { status: 200 }
  );
}
