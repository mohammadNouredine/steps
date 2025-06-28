"use client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import CardContainer from "@/app/dashboard/_common/components/CardContainer";
import { DateRangePicker } from "rsuite";
import { formatDate, formatDateToDashes } from "@/helpers/formatDate";
import SearchInput from "@/components/fields/form/SearchInput";
import { DateRange } from "rsuite/esm/DateRangePicker";
import useDebounce from "@/hooks/useDebounce";
import { DashboardKidTransactionType } from "@/app/dashboard/_common/types/kidTransactions";
import { useGetKidTransactions } from "@/app/dashboard/api-hookts/kid-transactions/useGetKidTransactions";
import Summary, {
  SummaryValue,
} from "@/app/dashboard/_common/components/PageHeader/Summary";
import { FaHistory } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import { KidTransactionAction, KidTransactionOperation } from "@prisma/client";

function KidTransactionsTable() {
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
  const { data: transactionsData, isPending } = useGetKidTransactions({
    params: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      startDate: selectedDateRange?.[0]
        ? formatDateToDashes(selectedDateRange?.[0])
        : undefined,
      endDate: selectedDateRange?.[1]
        ? formatDateToDashes(selectedDateRange?.[1])
        : undefined,
    },
  });

  //------------------HELPER FUNCTIONS-------------------------
  const getActionTypeLabel = (actionType: KidTransactionAction) => {
    const labels: Record<KidTransactionAction, string> = {
      KID_CREATE: "إنشاء طفل",
      KID_UPDATE: "تعديل طفل",
      KID_DELETE: "حذف طفل",
      PAYMENT_CREATE: "إنشاء دفعة",
      PAYMENT_UPDATE: "تعديل دفعة",
      PAYMENT_DELETE: "حذف دفعة",
      SUBSCRIPTION_CREATE: "إنشاء اشتراك",
      SUBSCRIPTION_UPDATE: "تعديل اشتراك",
      SUBSCRIPTION_DELETE: "حذف اشتراك",
      ATTENDANCE_CREATE: "تسجيل حضور",
      ATTENDANCE_UPDATE: "تعديل حضور",
      ATTENDANCE_DELETE: "حذف حضور",
      PURCHASE_CREATE: "إنشاء مشترى",
      PURCHASE_UPDATE: "تعديل مشترى",
      PURCHASE_DELETE: "حذف مشترى",
    };
    return labels[actionType] || actionType;
  };

  const getOperationTypeLabel = (operationType: KidTransactionOperation) => {
    const labels: Record<KidTransactionOperation, string> = {
      CREATE: "إنشاء",
      UPDATE: "تعديل",
      DELETE: "حذف",
    };
    return labels[operationType] || operationType;
  };

  const getAmountColor = (amount: number, actionType: KidTransactionAction) => {
    if (actionType.includes("PAYMENT") || actionType.includes("SUBSCRIPTION")) {
      return "text-green-600";
    }
    if (actionType.includes("PURCHASE") || actionType.includes("ATTENDANCE")) {
      return "text-red-600";
    }
    return "text-gray-600";
  };

  //------------------COLUMNS-------------------------
  const transactions_columns: ColumnDef<DashboardKidTransactionType>[] = [
    {
      accessorKey: "kid",
      header: () => <span>الطفل</span>,
      cell: (info: any) => (
        <div className="font-medium">
          {info.row.original.kid.firstName} {info.row.original.kid.lastName}
        </div>
      ),
    },
    {
      accessorKey: "actionType",
      header: () => <span>نوع العملية</span>,
      cell: (info: any) => (
        <div className="text-sm">
          {getActionTypeLabel(info.row.original.actionType)}
        </div>
      ),
    },
    {
      accessorKey: "operationType",
      header: () => <span>نوع العمل</span>,
      cell: (info: any) => (
        <div className="text-sm">
          {getOperationTypeLabel(info.row.original.operationType)}
        </div>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: () => <span>المبلغ</span>,
      cell: (info: any) => (
        <div
          className={`font-semibold ${getAmountColor(
            info.row.original.totalAmount,
            info.row.original.actionType
          )}`}
        >
          {info.row.original.totalAmount.toFixed(2)} د.ك
        </div>
      ),
    },
    {
      accessorKey: "user",
      header: () => <span>المستخدم</span>,
      cell: (info: any) => (
        <div className="text-sm">
          {info.row.original.user.firstName} {info.row.original.user.lastName}
          <div className="text-xs text-gray-500">
            {info.row.original.user.username}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "transactionDate",
      header: () => <span>التاريخ</span>,
      cell: (info: any) => (
        <div className="text-sm">
          {formatDate(info.row.original.transactionDate)}
        </div>
      ),
    },
    {
      accessorKey: "loanBalanceAfter",
      header: () => <span>الرصيد النهائي</span>,
      cell: (info: any) => (
        <div className="text-sm font-medium">
          {info.row.original.loanBalanceAfter.toFixed(2)} د.ك
        </div>
      ),
    },
  ];

  const summary_values: SummaryValue[] = [
    {
      title: "Total Transactions",
      value: transactionsData?.pagination.totalCount
        ? `${transactionsData.pagination.totalCount}`
        : "---",
      icon: <FaHistory />,
      textColor: "success",
    },
    {
      title: "Total Amount",
      value: transactionsData?.data
        ? `${transactionsData.data
            .reduce((sum, t) => sum + t.totalAmount, 0)
            .toFixed(2)} د.ك`
        : "---",
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
            placeholder="اختر نطاق التاريخ"
          />
        </CardContainer>

        <DashboardTable
          data={transactionsData?.data}
          columns={transactions_columns}
          pagination={pagination}
          setPagination={setPagination}
          isLoading={isPending}
        />
      </div>
    </div>
  );
}

export default KidTransactionsTable;
