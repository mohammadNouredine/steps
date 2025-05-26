import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { CreateAttendanceDto } from "../_dto/mutate-attendee.dto.js";

export async function createAttendance(
  _: NextRequest,
  data: CreateAttendanceDto
) {
  const { date, kidId, extraCharge, note } = data;

  // 1️⃣ ensure kid exists
  const kid = await prisma.kid.findUnique({ where: { id: parseInt(kidId) } });
  if (!kid) {
    return NextResponse.json({ message: "Kid not found" }, { status: 404 });
  }

  // 2️⃣ prevent duplicate attendance
  const existing = await prisma.attendance.findUnique({
    where: { kidId_date: { kidId: parseInt(kidId), date } },
  });
  if (existing) {
    return NextResponse.json(
      { message: "Attendance already exists" },
      { status: 400 }
    );
  }

  // 3️⃣ create attendance record
  const attendance = await prisma.attendance.create({
    data: {
      date,
      kidId: parseInt(kidId),
      note,
      extraCharge,
    },
  });

  // 4️⃣ if the kid has a USAGE plan active today, bill them
  const subscription = await prisma.subscription.findFirst({
    where: {
      kidId: parseInt(kidId),
      status: "ACTIVE",
      startDate: { lte: new Date(date) },
      endDate: { gte: new Date(date) },
    },
    include: { plan: true },
  });

  if (subscription && subscription.plan.billingMode === "USAGE") {
    // increment loanBalance by the plan price
    await prisma.kid.update({
      where: { id: parseInt(kidId) },
      data: { loanBalance: { increment: subscription.plan.price } },
    });
  }

  return NextResponse.json(
    { message: "Attendance added successfully", data: attendance },
    { status: 200 }
  );
}
