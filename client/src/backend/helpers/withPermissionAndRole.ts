import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUserId } from "./getLoggedInUserId";
import prisma from "@/lib/db";
import {
  PermissionModuleEnum,
  PermissionActionEnum,
  RoleEnum,
} from "@/types/permissions";

export function withPermissionAndRole(config: {
  module: PermissionModuleEnum;
  action: PermissionActionEnum;
  roles: RoleEnum[];
}) {
  return function <T extends any[]>(
    handler: (req: NextRequest, ...args: T) => Promise<NextResponse>
  ) {
    return async (req: NextRequest, ...args: T): Promise<NextResponse> => {
      try {
        const userId = getLoggedInUserId({ req });

        if (!userId) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }

        // Check user roles first
        const userRoles = await prisma.userRole.findMany({
          where: {
            userId: Number(userId),
            role: {
              name: {
                in: config.roles,
              },
            },
          },
          include: {
            role: true,
          },
        });

        if (userRoles.length === 0) {
          return NextResponse.json(
            {
              message: `Insufficient role. Required roles: ${config.roles.join(
                " | "
              )}`,
            },
            { status: 403 }
          );
        }

        // Check user permissions
        const userPermission = await prisma.userPermission.findFirst({
          where: {
            userId: Number(userId),
            action: {
              name: config.action,
              module: {
                name: config.module,
              },
            },
          },
          include: {
            action: {
              include: {
                module: true,
              },
            },
          },
        });

        if (!userPermission || !userPermission.allowed) {
          return NextResponse.json(
            {
              message: `Insufficient permissions. Required: ${config.module}.${config.action}`,
            },
            { status: 403 }
          );
        }

        // User has both required role and permission, proceed with the handler
        return await handler(req, ...args);
      } catch (error) {
        console.error("Permission and role check error:", error);
        return NextResponse.json(
          { message: "Internal server error" },
          { status: 500 }
        );
      }
    };
  };
}
