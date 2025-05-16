import { doesPasswordsMatch, hashPassword } from "../lib/password-utils";
import { generateJwtToken } from "../lib/jwt-token-utils";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import {
  LoginWithUsernameBodyParams,
  loginWithUsernameValidation,
} from "@/common/validations/auth";

export async function login({ req }: { req: Request }) {
  try {
    const { username, password }: LoginWithUsernameBodyParams =
      await req.json();

    // validate fields
    await loginWithUsernameValidation.validate({
      username,
      password,
    });

    // check if phone exists
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        image: true,
        createdAt: true,
        passwordHash: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Wrong Phone Number" },
        {
          status: 400,
        }
      );
    }
    if (!doesPasswordsMatch(password, user.passwordHash)) {
      return NextResponse.json(
        { message: "Password" },
        {
          status: 400,
        }
      );
    }

    // generate jwt
    const token = generateJwtToken({ userId: user.id.toString() });

    return NextResponse.json(
      {
        data: { accessToken: token, user },
        message: "Logged In succesfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
