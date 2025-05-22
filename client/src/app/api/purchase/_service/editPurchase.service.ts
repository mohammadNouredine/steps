import { NextRequest, NextResponse } from "next/server";
import { EditPurchaseDto } from "../_dto/mutatePurchase.dto";
import prisma from "@/lib/db";

export async function editPurchase(
  _: NextRequest,
  data: EditPurchaseDto,
  id: number
) {
  const { kidId, attendanceId, purchaseDate, note, totalPrice, paidAmount } =
    data;
  const purchasedItem = await prisma.purchasedItem.findUnique({
    where: {
      id: id,
    },
  });

  if (!purchasedItem) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  await prisma.purchasedItem.update({
    where: {
      id: id,
    },
    data: {
      kidId: kidId,
      attendanceId: attendanceId,
      purchaseDate: purchaseDate,
      note: note,
      totalPrice: totalPrice,
      paidAmount: paidAmount,
    },
  });

  return NextResponse.json(
    { message: "Purchase edited successfully" },
    { status: 200 }
  );
}
