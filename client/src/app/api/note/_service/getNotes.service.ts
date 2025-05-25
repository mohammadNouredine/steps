import { NextRequest, NextResponse } from "next/server";
import { GetNoteSchemaType } from "../_dto/gets-note.dto";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import getDayRange from "@/backend/helpers/getDayRange";

export async function getNotes(_: NextRequest, dto: GetNoteSchemaType) {
  const { search, reminder_date, isArchived, lastId, isToday, hideArchived } =
    dto;

  const { startOfDay, startOfNextDay } = getDayRange(new Date().toISOString());

  const filters: Prisma.NoteWhereInput = {};

  if (hideArchived) {
    filters.isArchived = false;
  }

  if (isToday) {
    filters.reminderDate = {
      gte: startOfDay,
      lt: startOfNextDay,
    };
  }
  if (search) {
    filters.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (reminder_date) {
    filters.reminderDate = reminder_date;
  }

  if (isArchived) {
    filters.isArchived = isArchived;
  }
  if (lastId) filters.id = { lt: lastId };

  const pageSize = 20;

  const notes = await prisma.note.findMany({
    where: filters,
    orderBy: [
      { isArchived: "asc" }, // false (not archived) first, true (archived) last
      { id: "desc" }, // then sort by id descending within those groups
    ],
    take: pageSize,
  });

  const nextLastId = notes.length > 0 ? notes[notes.length - 1].id : null;
  const total = await prisma.note.count({ where: filters });
  return NextResponse.json({ data: notes, lastId: nextLastId, total });
}
