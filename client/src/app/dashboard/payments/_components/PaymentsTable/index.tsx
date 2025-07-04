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
import AddEditPaymentModal from "./AddEditPaymentModal";
import { DashboardPaymentType } from "@/app/dashboard/_common/types/payments";
import { useGetPayments } from "@/app/dashboard/api-hookts/payments/useGetPayments";
import { useDeletePayment } from "@/app/dashboard/api-hookts/payments/useDeletePayment";
import Summary, {
  SummaryValue,
} from "@/app/dashboard/_common/components/PageHeader/Summary";
import { FaMoneyBill } from "react-icons/fa6";

function PaymentsTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------

  const [editingPayment, setEditingPayment] = React.useState<
    DashboardPaymentType | undefined
  >();
  const [selectedDateRange, setSelectedDateRange] =
    React.useState<DateRange | null>();

  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  //------------------API CALLS-------------------------

  const { data: paymentsData, isPending } = useGetPayments({
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
  const summary = paymentsData?.summary;
  const { mutate: deletePayment } = useDeletePayment();
  //------------------COLUMNS-------------------------
  const payments_columns: ColumnDef<DashboardPaymentType>[] = [
    {
      accessorKey: "kid",
      header: () => <span>Kid</span>,
      cell: (info: any) => (
        <div>
          {info.row.original.kid.firstName} {info.row.original.kid.lastName}
        </div>
      ),
    },
    { accessorKey: "amount", header: () => <span>Amount</span> },

    {
      accessorKey: "paymentDate",
      header: () => <span>Date</span>,
      cell: (info: any) => (
        <div>
          {info.row.original.paymentDate
            ? formatDate(info.row.original.paymentDate)
            : "N/A"}
        </div>
      ),
    },
    { accessorKey: "note", header: () => <span>Note</span> },

    {
      accessorKey: "id",
      header: () => <span>Edit</span>,
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsOpen(true);
              setEditingPayment(info.row.original);
            }}
            className="border border-green px-2 py-2 rounded-lg text-green"
          >
            <FiEdit2 />
          </button>
        </div>
      ),
    },
  ];
  const summary_values: SummaryValue[] = [
    {
      title: "Total Payments",
      value: summary?.totalPayments ? `$${summary?.totalPayments}` : "---",
      icon: <FaMoneyBill />,
      textColor: "success",
    },
  ];

  //---------------------------RENDER-----------------
  return (
    <div>
      <Summary values={summary_values} isLoading={isPending} />
      <div className="space-y-4 mt-4">
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
        </CardContainer>
        <DashboardTable
          data={paymentsData?.data}
          columns={payments_columns}
          pagination={pagination}
          setPagination={setPagination}
          deleteMutation={deletePayment}
        />
      </div>

      <AddEditPaymentModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingPayment={editingPayment}
        setEditingPayment={setEditingPayment}
      />
    </div>
  );
}

export default PaymentsTable;
