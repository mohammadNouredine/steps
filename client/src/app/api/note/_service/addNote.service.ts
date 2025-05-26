import { NextRequest, NextResponse } from "next/server";
import { AddNoteSchemaType } from "../_dto/mutate-note.dto";
import prisma from "@/lib/db";

export async function addNote(_: NextRequest, dto: AddNoteSchemaType) {
  const { title, description, reminder_date, isArchived } = dto;
  console.log("REMINDER DATE IS: ", reminder_date);
  const note = await prisma.note.create({
    data: {
      title,
      description,
      reminderDate: reminder_date ? new Date(reminder_date) : undefined,
      isArchived,
    },
  });

  return NextResponse.json({ data: note });
}
