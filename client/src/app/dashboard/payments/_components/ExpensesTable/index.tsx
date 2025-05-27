"use client";
import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2 } from "react-icons/fi";
import CardContainer from "@/app/dashboard/_common/components/CardContainer";
import { Checkbox, DateRangePicker } from "rsuite";
import { formatDateToDashes } from "@/helpers/formatDate";
import SearchInput from "@/components/fields/form/SearchInput";
import { DateRange } from "rsuite/esm/DateRangePicker";
import useDebounce from "@/hooks/useDebounce";
import { useGetExpenses } from "@/app/dashboard/api-hookts/expenses/useGetExpenses";
import { DashboardExpenseType } from "@/app/dashboard/_common/types/expenses";
import { useDeleteExpense } from "@/app/dashboard/api-hookts/expenses/useDeleteExpense";
import AddEditExpenseModal from "./AddEditExpenseModal";

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

  const { data: expensesData } = useGetExpenses({
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

  const { mutate: deleteExpense } = useDeleteExpense();
  //------------------COLUMNS-------------------------
  const kids_columns: ColumnDef<DashboardExpenseType>[] = [
    {
      accessorKey: "title",
      header: () => <span>Title</span>,
    },
    { accessorKey: "description", header: () => <span>Description</span> },
    { accessorKey: "amount", header: () => <span>Amount</span> },
    { accessorKey: "date", header: () => <span>Date</span> },
    { accessorKey: "amountDue", header: () => <span>Amount Due</span> },
    { accessorKey: "paidAmount", header: () => <span>Paid Amount</span> },

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
  //---------------------------RENDER-----------------
  return (
    <div>
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
