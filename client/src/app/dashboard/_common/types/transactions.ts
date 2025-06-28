import { Transaction } from "@prisma/client";

export type DashboardTransactionType = Transaction & {
  Kid: {
    id: number;
    firstName: string;
    lastName: string;
  };
  User: {
    id: number;
    username: string;
    firstName: string | null;
    lastName: string | null;
  };
};
