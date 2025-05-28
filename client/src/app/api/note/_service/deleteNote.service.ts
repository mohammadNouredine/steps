import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function deleteNote({ id }: { id: number }) {
  const note = await prisma.note.delete({ where: { id } });

  return NextResponse.json(
    {
      message: "Note deleted successfully",
      data: note,
    },
    { status: 200 }
  );
}
