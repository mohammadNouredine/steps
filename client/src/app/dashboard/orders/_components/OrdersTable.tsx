"use client";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<DashboardOrder>();
import React, { useEffect } from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2 } from "react-icons/fi";
import AddEditOrderModal from "./AddEditOrderModal";
import { useGetAllOrders } from "../../api-hookts/order/useGetAllOrders";
import { useDeleteOrder } from "../../api-hookts/order/useDeleteOrder";
import { DashboardOrder } from "../../_common/types/order";
import { FaEye, FaPrint } from "react-icons/fa6";
import ViewInvoiceModal from "./ViewInvoiceModal";

function OrdersTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------
  const [selectedRows, setSelectedRows] = React.useState<DashboardOrder[]>([]);
  const [editingOrder, setEditingOrder] = React.useState<
    DashboardOrder | undefined
  >();
  const [viewingInvoice, setViewingInvoice] = React.useState<
    DashboardOrder | undefined
  >();
  const [isOpenViewInvoice, setIsOpenViewInvoice] =
    React.useState<boolean>(false);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);
  //------------------API CALLS-------------------------
  const { data: orders_data } = useGetAllOrders();
  const { mutate: deleteOrder } = useDeleteOrder();

  //------------------COLUMNS-------------------------
  const collections_columns = [
    columnHelper.accessor("id", {
      header: () => <span>ID</span>,
      cell: (info) => <div>{info.row.original.id}</div>,
    }),
    columnHelper.accessor("customer_name", {
      header: () => <span>Customer Name</span>,
      cell: (info) => <div>{info.row.original.customer_name}</div>,
    }),

    columnHelper.accessor("customer_address", {
      header: () => <span>Address</span>,
      cell: (info) => <div>{info.row.original.customer_address}</div>,
    }),
    columnHelper.accessor("customer_phone", {
      header: () => <span>Phone</span>,
      cell: (info) => <div>{info.row.original.customer_phone}</div>,
    }),
    columnHelper.accessor("order_status", {
      header: () => <span>Status</span>,
      cell: (info) => <div>{info.row.original.order_status}</div>,
    }),
    columnHelper.accessor("is_delivery", {
      header: () => <span>Is Delivery</span>,
      cell: (info) => <div>{info.row.original.is_delivery}</div>,
    }),
    columnHelper.accessor("total", {
      header: () => <span>Total</span>,
      cell: (info) => <div>{info.row.original.total}</div>,
    }),

    columnHelper.accessor("id", {
      header: () => <span>Actions</span>,
      cell: (info) => (
        <div className="flex gap-x-2">
          <button
            onClick={() => {
              setEditingOrder(info.row.original);
              setIsOpen(true);
            }}
            className="border border-red-500 px-2 py-2 rounded-lg text-red-500"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => {
              setViewingInvoice(info.row.original);
              setIsOpenViewInvoice(true);
            }}
            className="border border-red-500 px-2 py-2 rounded-lg text-red-500"
          >
            <FaEye />
          </button>
        </div>
      ),
    }),
  ];
  //---------------------------RENDER-----------------
  return (
    <div className="">
      {
        <div className="w-full flex justify-end">
          <button
            disabled={!(selectedRows && selectedRows.length > 0)}
            className="p-2 rounded-lg border-primary border text-primary hover:bg-primary hover:text-white transition-all disabled:border-gray-300 disabled:text-gray-500"
            onClick={() => {
              setViewingInvoice(undefined);
              setIsOpenViewInvoice(true);
            }}
          >
            <FaPrint />
          </button>
        </div>
      }
      <DashboardTable
        hasSelection={true}
        setSelectedRows={setSelectedRows as any}
        data={orders_data}
        columns={collections_columns}
        deleteMutation={deleteOrder}
      />
      <AddEditOrderModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingOrder={editingOrder}
        setEditingOrder={setEditingOrder}
      />

      <ViewInvoiceModal
        isOpen={isOpenViewInvoice}
        setIsOpen={setIsOpenViewInvoice}
        viewwingInvoices={
          viewingInvoice
            ? [viewingInvoice]
            : selectedRows && selectedRows.length > 0
            ? selectedRows
            : []
        }
        setViewwingInvoice={setEditingOrder}
      />
    </div>
  );
}

export default OrdersTable;
