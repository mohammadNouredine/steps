import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/backend/helpers/withAuth";
import { withPermissionAndRole } from "@/backend/helpers/withPermissionAndRole";
import { KidTransactionService } from "@/backend/helpers/transactionService";
import prisma from "@/lib/db";
import {
  PermissionModuleEnum,
  PermissionActionEnum,
  RoleEnum,
} from "@/types/permissions";

async function handler(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const { searchParams } = new URL(req.url);
      const kidId = searchParams.get("kidId");
      const actionType = searchParams.get("actionType");
      const operationType = searchParams.get("operationType");
      const startDate = searchParams.get("startDate");
      const endDate = searchParams.get("endDate");
      const limit = parseInt(searchParams.get("limit") || "50");
      const offset = parseInt(searchParams.get("offset") || "0");

      const options = {
        limit,
        offset,
        actionType: actionType as any,
        operationType: operationType as any,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      };

      let transactions;
      let totalCount;

      if (kidId) {
        // Get transactions for a specific kid
        transactions = await KidTransactionService.getKidTransactions(
          parseInt(kidId),
          options
        );
        totalCount = await prisma.kidTransaction.count({
          where: { kidId: parseInt(kidId) },
        });
      } else {
        // Get all transactions with pagination
        const where: any = {};

        if (actionType) {
          where.actionType = actionType;
        }

        if (operationType) {
          where.operationType = operationType;
        }

        if (startDate || endDate) {
          where.transactionDate = {};
          if (startDate) where.transactionDate.gte = new Date(startDate);
          if (endDate) where.transactionDate.lte = new Date(endDate);
        }

        [transactions, totalCount] = await Promise.all([
          prisma.kidTransaction.findMany({
            where,
            include: {
              kid: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
              user: {
                select: {
                  id: true,
                  username: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
            orderBy: {
              transactionDate: "desc",
            },
            take: limit,
            skip: offset,
          }),
          prisma.kidTransaction.count({ where }),
        ]);
      }

      return NextResponse.json({
        data: transactions,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + limit < totalCount,
        },
      });
    } catch (error) {
      console.error("Error fetching kid transactions:", error);
      return NextResponse.json(
        { message: "Failed to fetch kid transactions" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export const GET = withAuth(
  withPermissionAndRole({
    module: PermissionModuleEnum.ACCOUNTING,
    action: PermissionActionEnum.READ,
    roles: [RoleEnum.SUPER_ADMIN],
  })(handler)
);
