// /backend/users/services/edit-kid.service.ts

import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import {
  getText,
  getDate,
  getEnum,
  getNumber,
} from "@/backend/helpers/safe-extract-formdata";
import { validateData } from "@/backend/helpers/validateData";
import { EditKidValidationSchema } from "@/common/validations/kids";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/backend/lib/upload-utils";
import { Gender } from "@prisma/client";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function editKid({ req, id }: { req: Request; id: number }) {
  const formData = await req.formData();

  // 1) Extract your fields
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

  // rawImage may be File | string | null
  const rawImage = formData.get("image") as File | string | null;

  // 2) Validate (will return a NextResponse on error)
  const validationResponse = await validateData(
    { ...data, image: rawImage },
    EditKidValidationSchema
  );
  if (validationResponse) {
    return validationResponse;
  }

  // 3) Fetch existing record
  const kid = await prisma.kid.findUnique({ where: { id } });
  if (!kid) {
    return NextResponse.json({ message: "Kid not found" }, { status: 404 });
  }

  // 4) Handle Cloudinary deletion if needed
  //    - if there was an old image AND the new value is null (deleted)
  //      OR the new value is a File (replacement)
  let imageUrl = kid.image;
  const shouldDeleteOld =
    kid.image && (rawImage === null || rawImage instanceof File);

  if (shouldDeleteOld) {
    const del = await deleteFromCloudinary(kid.image ?? "");
    if (!del.success) {
      return NextResponse.json(
        { message: "Failed to delete old image" },
        { status: 400 }
      );
    }
    imageUrl = ""; // clear it, we'll either leave blank or overwrite below
  }

  // 5) If the new image is a File, upload it
  if (rawImage instanceof File) {
    const buffer = await rawImage.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${rawImage.type};base64,${base64}`;
    const upload = await uploadToCloudinary(dataUri, rawImage.name);
    if (!upload.success) {
      return NextResponse.json(
        { message: "Failed to upload new image" },
        { status: 500 }
      );
    }
    imageUrl = upload.result?.secure_url ?? "";
  }
  // if rawImage is a string, we leave imageUrl as-is (unchanged)

  // 6) Persist the update
  try {
    const updated = await prisma.kid.update({
      where: { id },
      data: {
        firstName: data.firstName!,
        lastName: data.lastName!,
        phoneNumber: data.phoneNumber ?? undefined,
        dateOfBirth: data.dateOfBirth ?? undefined,
        dateJoined: data.dateJoined ?? undefined,
        gender: data.gender ?? undefined,
        loanBalance: data.loanBalance ?? undefined,
        notes: data.notes ?? undefined,
        image: imageUrl,
      },
    });

    // Log the transaction after successful kid update
    try {
      const userId = getLoggedInUserId({ req });
      if (userId) {
        await KidTransactionService.logKidUpdate(
          id,
          userId,
          {
            firstName: kid.firstName,
            lastName: kid.lastName,
            loanBalance: kid.loanBalance,
            gender: kid.gender,
            dateJoined: kid.dateJoined,
            notes: kid.notes,
            image: kid.image,
          },
          {
            firstName: updated.firstName,
            lastName: updated.lastName,
            loanBalance: updated.loanBalance,
            gender: updated.gender,
            dateJoined: updated.dateJoined,
            notes: updated.notes,
            image: updated.image,
          }
        );
      }
    } catch (transactionError) {
      console.error("Failed to log kid update transaction:", transactionError);
      // Don't fail the main operation if transaction logging fails
    }

    return NextResponse.json({
      message: "Kid updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Prisma update error:", err);
    return NextResponse.json(
      { message: "Failed to update kid", error: (err as Error).message },
      { status: 500 }
    );
  }
}
