import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function addUser({ req }: { req: NextRequest }) {
  try {
    const body = await req.json();
    const { username, firstName, lastName, password, roles, permissions } =
      body;

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with transaction to handle roles and permissions
    const user = await prisma.$transaction(async (tx) => {
      // Create the user
      const newUser = await tx.user.create({
        data: {
          username,
          firstName,
          lastName,
          passwordHash: hashedPassword,
        },
      });

      // Add roles if provided
      if (roles && Array.isArray(roles)) {
        for (const roleName of roles) {
          const role = await tx.role.findUnique({
            where: { name: roleName },
          });

          if (role) {
            await tx.userRole.create({
              data: {
                userId: newUser.id,
                roleId: role.id,
              },
            });
          }
        }
      }

      // Add permissions if provided
      if (permissions && typeof permissions === "object") {
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
                    userId: newUser.id,
                    actionId: action.id,
                    allowed,
                  },
                });
              }
            }
          }
        }
      }

      return newUser;
    });

    return NextResponse.json(
      { message: "User created successfully", data: { id: user.id } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
