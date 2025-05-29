"use client";
import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2 } from "react-icons/fi";
import Image from "next/image";
import { useGetSubscriptions } from "../../api-hookts/subscriptions/useGetSubscriptions";
import { useDeleteSubscription } from "../../api-hookts/subscriptions/useDeleteSubscription";
import { DashboardSubscriptionType } from "../../_common/types/subscriptions";
import AddEditSubscriptionModal from "./AddEditSubscriptionModal";
import { formatDate } from "@/helpers/formatDate";

function SubscriptionsTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------

  const [editingSubscription, setEditingSubscription] = React.useState<
    DashboardSubscriptionType | undefined
  >();
  //------------------API CALLS-------------------------
  const { data: subscriptions_data } = useGetSubscriptions({
    params: {},
  });
  const { mutate: deleteSubscription } = useDeleteSubscription();

  //------------------COLUMNS-------------------------
  const kids_columns: ColumnDef<DashboardSubscriptionType>[] = [
    {
      accessorKey: "image",
      header: () => <span>Image</span>,
      cell: (info) => (
        <div>
          {info.row.original.kid.image ? (
            <Image
              src={info.row.original.kid.image}
              alt={info.row.original.kid.firstName}
              width={50}
              height={50}
            />
          ) : (
            <div>-</div>
          )}
        </div>
      ),
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
      accessorKey: "price",
      header: () => <span>Price</span>,
    },

    {
      accessorKey: "status",
      header: () => <span>Status</span>,
    },
    {
      accessorKey: "startDate",
      header: () => <span>Start Date</span>,
      cell: (info) => <div>{formatDate(info.row.original.startDate)}</div>,
    },

    {
      accessorKey: "id",
      header: () => <span>Edit</span>,
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingSubscription(info.row.original);
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
        data={subscriptions_data?.data}
        columns={kids_columns}
        deleteMutation={deleteSubscription}
      />
      <AddEditSubscriptionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingSubscription={editingSubscription}
        setEditingSubscription={setEditingSubscription}
      />
    </div>
  );
}

export default SubscriptionsTable;
