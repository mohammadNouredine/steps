import prisma from "@/lib/db";
import { getLoggedInUserId } from "../../helpers/getLoggedInUserId";
import { NextResponse } from "next/server";

// this function will get the user info using the auth token sent from frontend(web+mobile)
export async function autoLogin({ req }: { req: Request }) {
  try {
    const userId = getLoggedInUserId({ req });

    if (!userId) {
      return NextResponse.json({ message: "User Not Found!" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        firstName: true,
        lastName: true,
        updatedAt: true,
        id: true,
        username: true,
        image: true,
        createdAt: true,
        userRoles: {
          include: {
            role: true,
          },
        },
        userPermissions: {
          select: {
            allowed: true,
            action: {
              select: {
                name: true,
                module: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User Not Found!" }, { status: 400 });
    }

    const permissions: Record<string, Record<string, boolean>> = {};

    // Get all available modules and actions from the database
    const userPermissions = user.userPermissions || [];

    // Create a map of existing permissions for quick lookup
    const existingPermissions = userPermissions.reduce((acc: any, up: any) => {
      const moduleName = up.action.module.name;
      const actionName = up.action.name;

      if (!acc[moduleName]) {
        acc[moduleName] = {};
      }
      acc[moduleName][actionName] = up.allowed;

      return acc;
    }, {});

    // Initialize all possible permissions to false, then override with existing ones
    const allModules = [
      "Kids",
      "Attendance",
      "Payments",
      "Subscriptions",
      "Expenses",
      "Users",
      "Reports",
      "Accounting",
      "Purchases",
      "Notes",
    ];
    const allActions = ["read", "write", "delete", "export"];

    allModules.forEach((module) => {
      permissions[module] = {};
      allActions.forEach((action) => {
        // Only set permissions for valid module-action combinations
        if (
          (module === "Reports" &&
            (action === "read" || action === "export")) ||
          (module !== "Reports" && ["read", "write", "delete"].includes(action))
        ) {
          permissions[module][action] =
            existingPermissions[module]?.[action] || false;
        }
      });
    });

    const transformedUser = {
      // Initialize permissions object with all modules and actions set to false

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

    //get the role of the user
    const role = await prisma.userRole.findFirst({
      where: {
        userId: user.id,
      },

      select: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!role) {
      console.log("no roles");
    }
    const userWithRoles = {
      ...transformedUser,
      role: role?.role.name,
    };
    return NextResponse.json(
      {
        user: userWithRoles,
        message: "Welcome",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
