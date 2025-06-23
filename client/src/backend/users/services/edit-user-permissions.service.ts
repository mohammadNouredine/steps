import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function editUserPermissions({
  req,
  id,
}: {
  req: NextRequest;
  id: number;
}) {
  try {
    const body = await req.json();
    const { permissions } = body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Validate permissions object
    if (!permissions || typeof permissions !== "object") {
      return NextResponse.json(
        { message: "Permissions object is required" },
        { status: 400 }
      );
    }

    // Delete existing permissions
    await prisma.userPermission.deleteMany({
      where: { userId: id },
    });

    // Add new permissions
    for (const [moduleName, actions] of Object.entries(permissions)) {
      const module = await prisma.permissionModule.findUnique({
        where: { name: moduleName },
      });

      if (module) {
        for (const [actionName, allowed] of Object.entries(
          actions as Record<string, boolean>
        )) {
          const action = await prisma.permissionAction.findFirst({
            where: {
              name: actionName,
              moduleId: module.id,
            },
          });

          if (action) {
            await prisma.userPermission.create({
              data: {
                userId: id,
                actionId: action.id,
                allowed,
              },
            });
          }
        }
      }
    }

    return NextResponse.json(
      { message: "User permissions updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user permissions:", error);
    return NextResponse.json(
      { message: "Failed to update user permissions" },
      { status: 500 }
    );
  }
}
