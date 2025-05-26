"use client";
import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2 } from "react-icons/fi";
import AddEditPurchaseModal from "./AddEditPurchaseModal";
import { cn } from "@/utils/cn";
import { DashboardPurchasedItem } from "../../_common/types/PurchasedItem";
import { formatDateToDashes } from "@/helpers/formatDate";
import { useGetPurchases } from "../../api-hookts/purchases/useGetPurchases";
import { useDeletePurchase } from "../../api-hookts/purchases/useDeletePurchase";

function PurchasesTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------

  const [editingPurchase, setEditingPurchase] = React.useState<
    DashboardPurchasedItem | undefined
  >();
  //------------------API CALLS-------------------------
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data: purchases_data } = useGetPurchases({
    params: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    },
  });
  const { mutate: deletePurchase } = useDeletePurchase();

  //------------------COLUMNS-------------------------
  const kids_columns: ColumnDef<DashboardPurchasedItem>[] = [
    {
      accessorKey: "id",
      size: 10,
      minSize: 10,
      maxSize: 10,
      header: () => <span>ID</span>,
      cell: (info) => {
        return (
          <div className={cn("text-gray-400")}>{info.row.original.id}</div>
        );
      },
    },

    {
      accessorKey: "firstName",
      header: () => <span>First Name</span>,
      cell: (info) => <div>{info.row.original.kid.firstName}</div>,
    },
    {
      accessorKey: "lastName",
      header: () => <span>Last Name</span>,
      cell: (info) => <div>{info.row.original.kid.lastName}</div>,
    },
    {
      accessorKey: "totalPrice",
      header: () => <span>Total Price</span>,
      cell: (info) => <div>{info.row.original.totalPrice}</div>,
    },
    {
      accessorKey: "paidAmount",
      header: () => <span>Paid Amount</span>,
      cell: (info) => <div>{info.row.original.paidAmount}</div>,
    },
    {
      accessorKey: "purchaseDate",
      header: () => <span>Purchase Date</span>,
      cell: (info) => (
        <div>{formatDateToDashes(info.row.original.purchaseDate)}</div>
      ),
    },

    {
      accessorKey: "id",
      header: () => <span>Edit</span>,
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingPurchase(info.row.original);
              setIsOpen(true);
            }}
            className="border border-red-500 px-2 py-2 rounded-lg text-red-500"
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
      <DashboardTable
        data={purchases_data?.data}
        columns={kids_columns}
        deleteMutation={deletePurchase}
        pagination={pagination}
        setPagination={setPagination}
      />
      <AddEditPurchaseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingPurchase={editingPurchase}
        setEditingPurchase={setEditingPurchase}
      />
    </div>
  );
}

export default PurchasesTable;
