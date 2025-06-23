import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
        userPermissions: {
          include: {
            action: {
              include: {
                module: true,
              },
            },
          },
        },
      },
    });

    // Transform the data to match the expected format
    const transformedUsers = users.map((user: any) => {
      // Initialize permissions object with all modules and actions set to false
      const permissions: Record<string, Record<string, boolean>> = {};

      // Get all available modules and actions from the database
      const userPermissions = user.userPermissions || [];

      // Create a map of existing permissions for quick lookup
      const existingPermissions = userPermissions.reduce(
        (acc: any, up: any) => {
          const moduleName = up.action.module.name;
          const actionName = up.action.name;

          if (!acc[moduleName]) {
            acc[moduleName] = {};
          }
          acc[moduleName][actionName] = up.allowed;

          return acc;
        },
        {}
      );

      // Initialize all possible permissions to false, then override with existing ones
      const allModules = [
        "Kids",
        "Attendance",
        "Payments",
        "Subscriptions",
        "Expenses",
        "Users",
        "Reports",
      ];
      const allActions = ["read", "write", "delete", "export"];

      allModules.forEach((module) => {
        permissions[module] = {};
        allActions.forEach((action) => {
          // Only set permissions for valid module-action combinations
          if (
            (module === "Reports" &&
              (action === "read" || action === "export")) ||
            (module !== "Reports" &&
              ["read", "write", "delete"].includes(action))
          ) {
            permissions[module][action] =
              existingPermissions[module]?.[action] || false;
          }
        });
      });

      return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        roles: user.userRoles,
        permissions,
      };
    });

    return NextResponse.json({ data: transformedUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
