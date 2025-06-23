import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    // Get all permission modules
    const modules = await prisma.permissionModule.findMany({
      include: {
        actions: true,
      },
    });

    // Get all user permissions for user ID 1
    const userPermissions = await prisma.userPermission.findMany({
      where: {
        userId: 1,
      },
      include: {
        action: {
          include: {
            module: true,
          },
        },
      },
    });

    return NextResponse.json({
      modules,
      userPermissions,
    });
  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
