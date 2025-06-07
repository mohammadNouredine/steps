import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import {
  AddContactMessageSchemaType,
  GetContactMessageSchemaType,
} from "../contact-message.dto";
import { Prisma } from "@prisma/client";

export async function addContactMessage(
  _: NextRequest,
  dto: AddContactMessageSchemaType
) {
  const { name, email, phone, childName, childAge, message } = dto;
  const contactMessage = await prisma.contactMessage.create({
    data: {
      name,
      email: email || "",
      phone,
      childName,
      childAge,
      message: message || "",
    },
  });

  return NextResponse.json({
    data: contactMessage,
    message: "لقد تم إرسال رسالة بنجاح",
  });
}

//--------------------------------GET--------------------------------

export async function getContactMessages(
  _: NextRequest,
  dto: GetContactMessageSchemaType
) {
  const { search, pageIndex, pageSize } = dto;
  const where: Prisma.ContactMessageWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const contactMessages = await prisma.contactMessage.findMany({
    where,
    skip: pageIndex * pageSize,
    take: pageSize,
  });

  const totalContactMessagesLength = await prisma.contactMessage.count({
    where,
  });

  return NextResponse.json({
    data: contactMessages,
    pagination: {
      pageIndex,
      pageSize,
      totalCount: totalContactMessagesLength,
      pageCount: contactMessages.length,
      totalPages: Math.ceil(totalContactMessagesLength / pageSize),
    },
  });
}
//--------------------------------DELETE--------------------------------

export async function deleteContactMessage(id: number) {
  const contactMessage = await prisma.contactMessage.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    data: contactMessage,
    message: "تم حذف الرسالة بنجاح",
  });
}
