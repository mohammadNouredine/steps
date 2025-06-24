import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUserId } from "./getLoggedInUserId";
import prisma from "@/lib/db";
import { RoleEnum } from "@/types/permissions";

export function withRole(config: { roles: RoleEnum[] }) {
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

        // Get user roles
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

        // User has required role, proceed with the handler
        return await handler(req, ...args);
      } catch (error) {
        console.error("Role check error:", error);
        return NextResponse.json(
          { message: "Internal server error" },
          { status: 500 }
        );
      }
    };
  };
}
