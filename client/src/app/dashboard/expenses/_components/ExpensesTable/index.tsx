"use client";
import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2 } from "react-icons/fi";
import CardContainer from "@/app/dashboard/_common/components/CardContainer";
import { Checkbox, DateRangePicker } from "rsuite";
import { formatDate, formatDateToDashes } from "@/helpers/formatDate";
import SearchInput from "@/components/fields/form/SearchInput";
import { DateRange } from "rsuite/esm/DateRangePicker";
import useDebounce from "@/hooks/useDebounce";
import { useGetExpenses } from "@/app/dashboard/api-hookts/expenses/useGetExpenses";
import { DashboardExpenseType } from "@/app/dashboard/_common/types/expenses";
import { useDeleteExpense } from "@/app/dashboard/api-hookts/expenses/useDeleteExpense";
import AddEditExpenseModal from "./AddEditExpenseModal";
import { FaCheckCircle, FaMoneyBill } from "react-icons/fa";
import Summary, {
  SummaryValue,
} from "@/app/dashboard/_common/components/PageHeader/Summary";
import { MdOutlineAttachMoney } from "react-icons/md";

function ExpensesTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------

  const [editingExpense, setEditingExpense] = React.useState<
    DashboardExpenseType | undefined
  >();
  const [selectedDateRange, setSelectedDateRange] =
    React.useState<DateRange | null>();
  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isPaymentPending, setIsPaymentPending] = React.useState(false);

  //------------------API CALLS-------------------------

  const { data: expensesData, isPending } = useGetExpenses({
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
      isPaymentPending,
    },
  });
  const summary = expensesData?.summary;
  const { mutate: deleteExpense } = useDeleteExpense();
  //------------------COLUMNS-------------------------
  const kids_columns: ColumnDef<DashboardExpenseType>[] = [
    {
      accessorKey: "title",
      header: () => <span>Title</span>,
    },
    { accessorKey: "description", header: () => <span>Description</span> },

    {
      accessorKey: "date",
      header: () => <span>Date</span>,
      cell: (info) => (
        <div className="flex gap-2">
          <span>{formatDate(info.row.original.date)}</span>
        </div>
      ),
    },
    { accessorKey: "amount", header: () => <span>Amount</span> },
    { accessorKey: "paidAmount", header: () => <span>Paid Amount</span> },
    {
      accessorKey: "amountDue",
      header: () => <span>Amount Due</span>,
      cell: (info) => {
        const amountDue = info.getValue() as number;
        const isFullyPaid = amountDue <= 0;
        return (
          <div className="flex gap-2">
            {isFullyPaid ? (
              <FaCheckCircle className="text-green" />
            ) : (
              <span>{amountDue}</span>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "id",
      header: () => <span>Edit</span>,
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsOpen(true);
              setEditingExpense(info.row.original);
            }}
            className="border border-green px-2 py-2 rounded-lg text-green"
          >
            <FiEdit2 />
          </button>
        </div>
      ),
    },
  ];

  const summaryValues: SummaryValue[] = [
    {
      title: "Total Amount",
      value: `$${summary?.totalAmount}`,
      icon: <FaMoneyBill className="text-brandYellow" />,
    },
    {
      title: "Total Paid",
      value: `$${summary?.totalPaid}`,
      icon: <FaCheckCircle className="text-green" />,
      textColor: "success",
    },
    {
      title: "Total Due",
      value: `$${summary?.totalDue}`,
      icon: <MdOutlineAttachMoney className="text-brand-red-neutral" />,
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
          />

          <Checkbox
            checked={isPaymentPending}
            onChange={(_, checked) => {
              setIsPaymentPending(checked);
            }}
            title="Show only payment pending"
          >
            <p className="text-gray-900 font-medium">
              {"Show only payment pending"}
            </p>
          </Checkbox>
        </CardContainer>
        <DashboardTable
          data={expensesData?.data}
          columns={kids_columns}
          pagination={pagination}
          setPagination={setPagination}
          deleteMutation={deleteExpense}
        />
      </div>

      <AddEditExpenseModal
        key={"add-edit-attendance-modal"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />
    </div>
  );
}

export default ExpensesTable;
