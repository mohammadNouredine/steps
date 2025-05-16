import validatePhoneNb from "../lib/validatePhoneNb";
import { hashPassword } from "../lib/password-utils";
import { generateJwtToken } from "../lib/jwt-token-utils";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import {
  RegisterWithUsernameBodyParams,
  registerWithUsernameValidation,
} from "@/common/validations/auth";

export async function register({ req }: { req: Request }) {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
    }: RegisterWithUsernameBodyParams = await req.json();

    // validate fields
    await registerWithUsernameValidation.validate({
      username,
      firstName,
      lastName,
      password,
    });

    // check if phone exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
        ],
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Phone number or email has already taken",
        },
        { status: 400 }
      );
    }

    // create new user
    const hashedPassword = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username: cleanString(username),
        passwordHash: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        image: true,
        createdAt: true,
      },
    });

    const role = await prisma.role.findFirst({
      where: {
        name: "user",
      },
    });
    let userRole = null;
    if (role) {
      userRole = await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: role.id,
        },
      });
    }
    // generate jwt
    const token = generateJwtToken({ userId: user?.id.toString() });

    const userWithRoles = {
      ...user,
      role: role?.name,
    };

    return NextResponse.json(
      {
        data: { accessToken: token, userWithRoles },
        message: "Registered succesfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
function cleanString(input: string) {
  if (typeof input === "string") {
    return input.replace(/\0/g, "");
  }
  return input;
}
