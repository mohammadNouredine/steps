import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUserId } from "./getLoggedInUserId";
import prisma from "@/lib/db";
import {
  PermissionModuleEnum,
  PermissionActionEnum,
} from "@/types/permissions";

export function withPermission(config: {
  module: PermissionModuleEnum;
  action: PermissionActionEnum;
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

        // Get user permissions
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

        // User has permission, proceed with the handler
        return await handler(req, ...args);
      } catch (error) {
        console.error("Permission check error:", error);
        return NextResponse.json(
          { message: "Internal server error" },
          { status: 500 }
        );
      }
    };
  };
}
