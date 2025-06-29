import { CustomErrorResponse } from "@/backend/helpers/customErrorResponse";
import { deleteFromCloudinary } from "@/backend/lib/upload-utils";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import { getLoggedInUserId } from "@/backend/helpers/getLoggedInUserId";

export async function deleteKid({ req, id }: { req: Request; id: number }) {
  const hasPayment = await prisma.payment.findFirst({
    where: {
      kidId: id,
    },
  });

  if (hasPayment) {
    return CustomErrorResponse("Kid has payments", 400);
  }

  const hasSubscription = await prisma.subscription.findFirst({
    where: {
      kidId: id,
    },
  });

  if (hasSubscription) {
    return CustomErrorResponse("Kid has subscription", 400);
  }

  const hasAttendance = await prisma.attendance.findFirst({
    where: {
      kidId: id,
    },
  });

  if (hasAttendance) {
    return CustomErrorResponse("Kid has attendance", 400);
  }

  const hasPurchasedItem = await prisma.purchasedItem.findFirst({
    where: {
      kidId: id,
    },
  });

  if (hasPurchasedItem) {
    return CustomErrorResponse("Kid has purchased items", 400);
  }

  const kidToBeDeleted = await prisma.kid.findFirst({ where: { id } });
  if (!kidToBeDeleted) {
    return CustomErrorResponse("Kid not found", 404);
  }

  if (kidToBeDeleted?.image) {
    const delImage = await deleteFromCloudinary(kidToBeDeleted?.image);
    console.log("DEL IMAGE", delImage);
    if (!delImage.success)
      return NextResponse.json(
        { message: "Failed to delete image" },
        { status: 400 }
      );
  }
  console.log("DELETING KID", kidToBeDeleted);
  const kid = await prisma.kid.delete({ where: { id } });
  console.log("KID", kid);

  // Log the transaction after successful kid deletion
  try {
    const userId = getLoggedInUserId({ req });
    if (userId) {
      await KidTransactionService.logKidDeletion(id, userId, {
        kidData: {
          firstName: kidToBeDeleted.firstName,
          lastName: kidToBeDeleted.lastName,
          loanBalance: kidToBeDeleted.loanBalance,
          gender: kidToBeDeleted.gender,
          dateJoined: kidToBeDeleted.dateJoined,
          notes: kidToBeDeleted.notes,
          image: kidToBeDeleted.image,
        },
      });
    }
  } catch (transactionError) {
    console.error("Failed to log kid deletion transaction:", transactionError);
    // Don't fail the main operation if transaction logging fails
  }

  return NextResponse.json(
    {
      message: "Kid deleted successfully",
      data: kid,
    },
    { status: 200 }
  );
}
