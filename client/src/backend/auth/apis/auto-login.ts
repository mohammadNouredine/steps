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
        id: true,
        username: true,
        image: true,
        createdAt: true,
        userRoles: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User Not Found!" }, { status: 400 });
    }
    //get the role of the user
    const roles = await prisma.userRole.findMany({
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
    if (!roles) {
      console.log("no roles");
    }
    const userWithRoles = {
      ...user,
      roles: roles.map((role) => role.role.name),
    };
    return NextResponse.json(
      {
        data: { user: userWithRoles },
        message: "Welcome",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
