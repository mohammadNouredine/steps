"use client";
import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2 } from "react-icons/fi";
import CardContainer from "@/app/dashboard/_common/components/CardContainer";
import { DateRangePicker } from "rsuite";
import { formatDate, formatDateToDashes } from "@/helpers/formatDate";
import SearchInput from "@/components/fields/form/SearchInput";
import { DateRange } from "rsuite/esm/DateRangePicker";
import useDebounce from "@/hooks/useDebounce";
import { useGetTransactions } from "@/app/dashboard/api-hookts/transactions/useGetTransactions";
import { DashboardTransactionType } from "@/app/dashboard/_common/types/transactions";
import { useDeleteTransaction } from "@/app/dashboard/api-hookts/transactions/useDeleteTransaction";
import { FaCalculator, FaUser, FaChild } from "react-icons/fa";
import Summary, {
  SummaryValue,
} from "@/app/dashboard/_common/components/PageHeader/Summary";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function TransactionsTable() {
  //------------------STATES-------------------------
  const [selectedDateRange, setSelectedDateRange] =
    React.useState<DateRange | null>();
  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  //------------------API CALLS-------------------------
  const { data: transactionsData, isPending } = useGetTransactions({
    params: {
      pageIndex: 0,
      pageSize: 10,
      search: debouncedSearchQuery,
      startDate: selectedDateRange?.[0]
        ? formatDateToDashes(selectedDateRange?.[0])
        : undefined,
      endDate: selectedDateRange?.[1]
        ? formatDateToDashes(selectedDateRange?.[1])
        : undefined,
    },
  });
  const summary = transactionsData?.summary;
  const { mutate: deleteTransaction } = useDeleteTransaction();

  //------------------COLUMNS-------------------------
  const transactions_columns: ColumnDef<DashboardTransactionType>[] = [
    {
      accessorKey: "id",
      header: () => <span>ID</span>,
      size: 60,
    },
    {
      accessorKey: "Kid",
      header: () => <span>Kid</span>,
      cell: (info) => (
        <div className="flex items-center gap-2">
          <FaChild className="text-blue-500" />
          <span>
            {info.row.original.Kid.firstName} {info.row.original.Kid.lastName}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "User",
      header: () => <span>User</span>,
      cell: (info) => (
        <div className="flex items-center gap-2">
          <FaUser className="text-green-500" />
          <span>{info.row.original.User.username}</span>
        </div>
      ),
    },
    {
      accessorKey: "transactionDate",
      header: () => <span>Date</span>,
      cell: (info) => (
        <div className="flex gap-2">
          <span>{formatDate(info.row.original.transactionDate)}</span>
        </div>
      ),
    },
    {
      accessorKey: "loanBalanceBeforeTransaction",
      header: () => <span>Before</span>,
      cell: (info) => (
        <div className="text-gray-600">
          ${info.row.original.loanBalanceBeforeTransaction}
        </div>
      ),
    },
    {
      accessorKey: "loanBalanceAfterTransaction",
      header: () => <span>After</span>,
      cell: (info) => (
        <div className="text-gray-600">
          ${info.row.original.loanBalanceAfterTransaction}
        </div>
      ),
    },
    {
      accessorKey: "exchangeOfLoans",
      header: () => <span>Exchange</span>,
      cell: (info) => {
        const exchange = info.row.original.exchangeOfLoans;
        const isPositive = exchange > 0;
        return (
          <div
            className={`flex items-center gap-2 ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? (
              <FaArrowUp className="text-green-500" />
            ) : (
              <FaArrowDown className="text-red-500" />
            )}
            <span>${Math.abs(exchange).toFixed(2)}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "note",
      header: () => <span>Note</span>,
      cell: (info) => (
        <div className="max-w-xs truncate">{info.row.original.note || "-"}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <span>Actions</span>,
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              // TODO: Implement edit functionality
              console.log("Edit transaction:", info.row.original.id);
            }}
            className="border border-blue-500 px-2 py-2 rounded-lg text-blue-500 hover:bg-blue-50"
          >
            <FiEdit2 />
          </button>
        </div>
      ),
    },
  ];

  const summaryValues: SummaryValue[] = [
    {
      title: "Total Transactions",
      value: summary?.totalTransactions?.toString() || "0",
      icon: <FaCalculator className="text-blue-500" />,
    },
    {
      title: "Total Exchange",
      value: `$${summary?.totalExchangeAmount?.toFixed(2) || "0.00"}`,
      icon: <MdOutlineAttachMoney className="text-green-500" />,
      textColor:
        summary?.totalExchangeAmount && summary.totalExchangeAmount > 0
          ? "success"
          : "red",
    },
    {
      title: "Positive Exchanges",
      value: `$${summary?.totalPositiveExchange?.toFixed(2) || "0.00"}`,
      icon: <FaArrowUp className="text-green-500" />,
      textColor: "success",
    },
    {
      title: "Negative Exchanges",
      value: `$${Math.abs(summary?.totalNegativeExchange || 0).toFixed(2)}`,
      icon: <FaArrowDown className="text-red-500" />,
      textColor: "red",
    },
  ];

  //---------------------------RENDER-----------------
  return (
    <div>
      <Summary values={summaryValues} isLoading={isPending} />

      <div className="space-y-4">
        <CardContainer className="flex items-center gap-x-4 flex-wrap space-y-2">
          <div className="w-[20rem]">
            <SearchInput value={searchQuery} setValue={setSearchQuery} />
          </div>

          <DateRangePicker
            value={selectedDateRange}
            onChange={(value) => {
              setSelectedDateRange(value);
            }}
            placeholder="Select date range"
          />
        </CardContainer>

        <DashboardTable
          data={transactionsData?.data}
          columns={transactions_columns}
          pagination={pagination}
          setPagination={setPagination}
          deleteMutation={deleteTransaction}
        />
      </div>
    </div>
  );
}

export default TransactionsTable;
