import {
  KidTransaction,
  KidTransactionAction,
  KidTransactionOperation,
} from "@prisma/client";
import { Pagination } from "./meta";

export type DashboardKidTransactionType = KidTransaction & {
  kid: {
    id: number;
    firstName: string;
    lastName: string;
  };
  user: {
    id: number;
    username: string;
    firstName: string | null;
    lastName: string | null;
  };
};

export type GetKidTransactionsParams = {
  kidId?: number;
  actionType?: KidTransactionAction;
  operationType?: KidTransactionOperation;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
};

export type GetKidTransactionsResponse = {
  data: DashboardKidTransactionType[];
  pagination: Pagination;
};

export type KidTransactionSummary = {
  totalTransactions: number;
  totalPayments: number;
  totalPurchases: number;
  totalSubscriptions: number;
  totalAttendanceCharges: number;
  currentBalance: number;
};
