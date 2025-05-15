import prisma from "@/lib/prismaClient";
import { doesPasswordsMatch, hashPassword } from "../lib/password-utils";
import { generateJwtToken } from "../lib/jwt-token-utils";
import { NextResponse } from "next/server";
import { loginWithPhoneValidation } from "../../validation";

export interface LoginWithPhoneBodyParams {
  phoneNumber: string;
  phoneCode: string;
  password: string;
}

export async function login({ req }: { req: Request }) {
  try {
    const { phoneNumber, phoneCode, password }: LoginWithPhoneBodyParams =
      await req.json();

    const cleanedPhoneNumber = phoneNumber.replace(/ /g, "");

    // validate fields
    await loginWithPhoneValidation.validate({
      phoneNumber,
      phoneCode,
      password,
    });

    // check if phone exists
    const user = await prisma.user.findFirst({
      where: {
        phoneCode: String(phoneCode),
        phoneNumber: Number(cleanedPhoneNumber),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneCode: true,
        phoneNumber: true,
        street: true,
        createdAt: true,
        password: true,
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
    if (!doesPasswordsMatch(password, user.password)) {
      return NextResponse.json(
        { message: "Password" },
        {
          status: 400,
        }
      );
    }

    // generate jwt
    const token = generateJwtToken({ userId: user.id });

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
