import { getNumber } from "@/backend/helpers/safe-extract-formdata";
import { getEnum } from "@/backend/helpers/safe-extract-formdata";
import { getDate } from "@/backend/helpers/safe-extract-formdata";
import { getText } from "@/backend/helpers/safe-extract-formdata";
import { validateData } from "@/backend/helpers/validateData";
import { uploadToCloudinary } from "@/backend/lib/upload-utils";
import { AddKidValidationSchema } from "@/common/validations/kids";
import prisma from "@/lib/db";
import { Gender } from "@prisma/client";
import { NextResponse } from "next/server";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

// 1) Define a Yup schema matching your prisma.kid fields

export async function addKid({ req }: { req: Request }) {
  // your auth check here if required

  const formData = await req.formData();

  const data = {
    firstName: getText(formData, "firstName") ?? "",
    lastName: getText(formData, "lastName") ?? "",
    phoneNumber: getText(formData, "phoneNumber"),
    dateOfBirth: getDate(formData, "dateOfBirth"),
    dateJoined: getDate(formData, "dateJoined"),
    gender: getEnum(formData, "gender", Gender),
    loanBalance: getNumber(formData, "loanBalance"),
    notes: getText(formData, "notes"),
  };
  const file = formData.get("image") as File;
  const validationResponse = await validateData(
    {
      ...data,
      image: file,
    },
    AddKidValidationSchema
  );
  if (validationResponse) {
    return validationResponse;
  }

  let fileUri = "";
  if (file) {
    const fileBuffer = await file.arrayBuffer();

    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");

    // this will be used to upload the file
    fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
  }
  const res = file
    ? await uploadToCloudinary(fileUri, file?.name || "")
    : {
        success: false,
        error: { message: "File is required" },
        result: {
          secure_url: "",
        },
      };
  const url = res.success ? res.result?.secure_url : "";

  try {
    const kid = await prisma.kid.create({
      data: {
        ...data,
        dateOfBirth: data.dateOfBirth ?? undefined,
        gender: data.gender,
        loanBalance: data.loanBalance ?? 0,
        notes: data.notes,
        image: url,
        dateJoined: data.dateJoined ?? undefined,
      },
    });

    // Log the transaction after successful kid creation
    try {
      const userId = getLoggedInUserId({ req });
      if (userId) {
        await KidTransactionService.logKidCreation(kid.id, userId, {
          kidData: {
            firstName: kid.firstName,
            lastName: kid.lastName,
            loanBalance: kid.loanBalance,
            gender: kid.gender,
            dateJoined: kid.dateJoined,
          },
        });
      }
    } catch (transactionError) {
      console.error("Failed to log transaction:", transactionError);
      // Don't fail the main operation if transaction logging fails
    }

    return NextResponse.json({
      message: "Kid added successfully",
      data: kid,
    });
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json(
      { message: "Failed to add kid", error: (error as Error).message },
      { status: 500 }
    );
  }
}
