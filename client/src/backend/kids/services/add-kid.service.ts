import { getNumber } from "@/backend/helpers/safe-extract-formdata";
import { getEnum } from "@/backend/helpers/safe-extract-formdata";
import { getDate } from "@/backend/helpers/safe-extract-formdata";
import { getText } from "@/backend/helpers/safe-extract-formdata";
import { validateData } from "@/backend/helpers/validateData";
import { uploadToCloudinary } from "@/backend/lib/upload-utils";
import prisma from "@/lib/db";
import { Gender } from "@prisma/client";
import { NextResponse } from "next/server";
import * as Yup from "yup";

// 1) Define a Yup schema matching your prisma.kid fields
const kidSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  phoneNumber: Yup.string().trim().nullable().default(null),
  dateOfBirth: Yup.date()
    .nullable()
    .default(undefined)
    .typeError("Date of birth must be a valid date"),
  gender: Yup.mixed<Gender>()
    .oneOf(Object.values(Gender) as Gender[], "Invalid gender")
    .nullable()
    .default(null),
  loanBalance: Yup.number()
    .nullable()
    .default(null)
    .typeError("Loan balance must be a number"),
  notes: Yup.string().trim().nullable().default(null),
  image: Yup.mixed<File>()
    .nullable()
    .default(null)
    .test(
      "is-file-or-null",
      "Image must be a File",
      (v) => v === null || v instanceof File
    )
    .test(
      "file-not-empty",
      "Image file is empty",
      (v) => v === null || (v instanceof File && v.size > 0)
    ),
});

export async function addKid({ req }: { req: Request }) {
  // your auth check here if required

  const formData = await req.formData();

  const data = {
    firstName: getText(formData, "firstName") ?? "",
    lastName: getText(formData, "lastName") ?? "",
    phoneNumber: getText(formData, "phoneNumber"),
    dateOfBirth: getDate(formData, "dateOfBirth"),
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
    kidSchema
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
        dateJoined: new Date(),
      },
    });
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
