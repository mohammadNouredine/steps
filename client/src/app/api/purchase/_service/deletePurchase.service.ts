import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function deletePurchase(id: number) {
  const purchase = await prisma.purchasedItem.findUnique({
    where: { id: id },
  });
  if (!purchase) {
    return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
  }
  await prisma.purchasedItem.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json(
    {
      message: "Purchase deleted successfully",
    },
    { status: 200 }
  );
}
