import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { capitalize } from "@/utils/capitalize";
import { CustomErrorResponse } from "./customErrorResponse";

export function withErrorHandling(handler: any) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(req);
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        return CustomErrorResponse(error.errors.join(". "), 400);
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // handle prisma unique constraint error
        if (error.code === "P2002") {
          return CustomErrorResponse(
            `${capitalize((error?.meta?.target as any)[0])} already exists`,
            400
          );
        }

        // handle prisma not found error
        if (error.code === "P2025") {
          return CustomErrorResponse(`Record not found.`, 404);
        }
      }

      return CustomErrorResponse(error.message, error.status);
    }
  };
}
