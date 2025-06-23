import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function getUserRoles() {
  try {
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(
      {
        message: "Roles retrieved successfully",
        data: roles,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving roles:", error);
    return NextResponse.json(
      { message: "Failed to retrieve roles" },
      { status: 500 }
    );
  }
}
