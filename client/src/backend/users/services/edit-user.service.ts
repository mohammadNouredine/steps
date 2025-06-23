import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function editUser({ req, id }: { req: NextRequest; id: number }) {
  try {
    const body = await req.json();
    const { username, firstName, lastName, password, roles, permissions } =
      body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if username is being changed and if it already exists
    if (username && username !== existingUser.username) {
      const userWithSameUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (userWithSameUsername) {
        return NextResponse.json(
          { message: "Username already exists" },
          { status: 400 }
        );
      }
    }

    // Update user with transaction to handle roles and permissions
    await prisma.$transaction(async (tx) => {
      // Update basic user info
      const updateData: any = {};
      if (username) updateData.username = username;
      if (firstName !== undefined) updateData.firstName = firstName;
      if (lastName !== undefined) updateData.lastName = lastName;
      if (password) {
        updateData.passwordHash = await bcrypt.hash(password, 12);
      }

      await tx.user.update({
        where: { id },
        data: updateData,
      });

      // Update roles if provided
      if (roles && Array.isArray(roles)) {
        // Delete existing roles
        await tx.userRole.deleteMany({
          where: { userId: id },
        });

        // Add new roles
        for (const roleName of roles) {
          const role = await tx.role.findUnique({
            where: { name: roleName },
          });

          if (role) {
            await tx.userRole.create({
              data: {
                userId: id,
                roleId: role.id,
              },
            });
          }
        }
      }

      // Update permissions if provided
      if (permissions && typeof permissions === "object") {
        // Delete existing permissions
        await tx.userPermission.deleteMany({
          where: { userId: id },
        });

        // Add new permissions
        for (const [moduleName, actions] of Object.entries(permissions)) {
          const moduleRecord = await tx.permissionModule.findUnique({
            where: { name: moduleName },
          });

          if (moduleRecord) {
            for (const [actionName, allowed] of Object.entries(
              actions as Record<string, boolean>
            )) {
              const action = await tx.permissionAction.findFirst({
                where: {
                  name: actionName,
                  moduleId: moduleRecord.id,
                },
              });

              if (action) {
                await tx.userPermission.create({
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
      }
    });

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 }
    );
  }
}
