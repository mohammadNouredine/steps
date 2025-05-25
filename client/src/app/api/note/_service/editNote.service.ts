import { NextRequest, NextResponse } from "next/server";
import { EditNoteSchemaType } from "../_dto/mutate-note.dto";
import prisma from "@/lib/db";

export async function editNote(_: NextRequest, dto: EditNoteSchemaType) {
  const { title, description, reminder_date, isArchived, id } = dto;

  const note = await prisma.note.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      reminderDate: reminder_date,
      isArchived,
    },
  });

  return NextResponse.json({ data: note });
}
