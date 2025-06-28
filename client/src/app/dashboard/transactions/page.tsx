"use client";
import TransactionsTable from "./_components/TransactionsTable";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600">
          View and manage loan balance transactions
        </p>
      </div>

      <TransactionsTable />
    </div>
  );
}
