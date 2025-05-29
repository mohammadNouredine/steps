import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function deletePurchase(id: number) {
  await prisma.$transaction(async (tx) => {
    // fetch to know how much to decrement
    const old = await tx.purchasedItem.findUnique({ where: { id } });
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
  });

  return NextResponse.json(
    { message: "Purchase deleted successfully" },
    { status: 200 }
  );
}
