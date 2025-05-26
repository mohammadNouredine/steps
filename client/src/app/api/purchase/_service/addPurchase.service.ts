import { NextRequest, NextResponse } from "next/server";
import { AddPurchaseDto } from "../_dto/mutatePurchase.dto";
import prisma from "@/lib/db";

export async function addPurchase(_: NextRequest, data: AddPurchaseDto) {
  const { kidId, attendanceId, purchaseDate, note, totalPrice, paidAmount } =
    data;
  const kid = await prisma.kid.findUnique({
    where: {
      id: kidId,
    },
  });

  if (!kid) {
    return NextResponse.json({ message: "Kid not found" }, { status: 404 });
  }

  await prisma.purchasedItem.create({
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
    { message: "Purchase added successfully" },
    { status: 200 }
  );
}
