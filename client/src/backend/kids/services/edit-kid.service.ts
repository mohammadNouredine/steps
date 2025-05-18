import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export async function editKid({ req }: { req: Request }) {
  const {
    id,
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    gender,
    loanBalance,
    notes,
    image,
  } = await req.json();

  const kid = await prisma.kid.update({
    where: { id },
    data: {
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      gender,
      loanBalance,
      notes,
      image,
    },
  });

  return NextResponse.json({
    message: "Kid updated successfully",
    data: kid,
  });
}
