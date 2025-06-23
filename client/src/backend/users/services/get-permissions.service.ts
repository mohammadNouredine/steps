import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function getPermissions() {
  try {
    const modules = await prisma.permissionModule.findMany({
      include: {
        actions: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    // Transform to a more frontend-friendly format
    const permissions = modules.map((module) => ({
      module: module.name,
      actions: module.actions.map((action) => action.name),
    }));

    return NextResponse.json({ data: permissions });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return NextResponse.json(
      { message: "Failed to fetch permissions" },
      { status: 500 }
    );
  }
}
