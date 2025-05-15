import prisma from "@/lib/prismaClient";
import validatePhoneNb from "../lib/validatePhoneNb";
import { hashPassword } from "../lib/password-utils";
import { generateJwtToken } from "../lib/jwt-token-utils";
import { NextResponse } from "next/server";
import { registerWithPhoneValidation } from "../../validation";

export interface RegisterWithPhoneBodyParams {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneCode: string;
  password: string;
  email: string;
  workCompany?: string;
  engineerType?: string;
}

export async function register({ req }: { req: Request }) {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      phoneCode,
      password,
      email,
      workCompany,
      engineerType,
    }: RegisterWithPhoneBodyParams = await req.json();

    const cleanedPhoneNumber = phoneNumber.replace(/ /g, "");

    // validate fields
    await registerWithPhoneValidation.validate({
      firstName,
      lastName,
      phoneNumber,
      phoneCode,
      password,
      email,
    });

    // validate phone number
    if (!validatePhoneNb(`${phoneCode}${cleanedPhoneNumber}`)) {
      return NextResponse.json({ message: "Invalid Phone!" }, { status: 400 });
    }

    // check if phone exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            phoneCode: String(phoneCode),
            phoneNumber: Number(cleanedPhoneNumber),
          },
          {
            email: email,
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
        firstName: cleanString(firstName),
        lastName: cleanString(lastName),
        phoneCode: cleanString(phoneCode),
        phoneNumber: Number(cleanedPhoneNumber), // Assuming this is already cleaned
        password: hashedPassword,
        email: cleanString(email),
        gender: "other",
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
      },
    });

    let userRole;
    if (workCompany || engineerType) {
      const role = await prisma.role.findFirst({
        where: {
          name: "engineer",
        },
        select: {
          id: true,
        },
      });
      if (role) {
        userRole = await prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: role.id,
          },
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        });
      }

      const engineer = await prisma.engineer.create({
        data: {
          userId: user.id,
          type: engineerType,
          company: workCompany,
        },
      });
    } else {
      const role = await prisma.role.findFirst({
        where: {
          name: "client",
        },
        select: {
          id: true,
        },
      });
      if (role) {
        userRole = await prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: role.id,
          },
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        });
      }

      const client = await prisma.client.create({
        data: {
          userId: user.id,
        },
      });
    }

    // generate jwt
    const token = generateJwtToken({ userId: user?.id });

    const userWithRoles = {
      ...user,
      roles: [userRole],
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
