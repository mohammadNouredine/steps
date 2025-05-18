"use client";
import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2, FiEye } from "react-icons/fi";
import { useGetAllKids } from "../../api-hookts/kids/useGetAllKids";
import { useDeleteKid } from "../../api-hookts/kids/useDeleteKid";
import { Gender, Kid } from "@prisma/client";
import AddEditKidModal from "./AddEditKidModal";
import Image from "next/image";
import { cn } from "@/utils/cn";
import ViewKidModal from "./ViewKidModal";

function KidsTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------

  const [editingKid, setEditingKid] = React.useState<Kid | undefined>();
  const [viewingKid, setViewingKid] = React.useState<Kid | undefined>();
  const [isOpenViewingKid, setIsOpenViewingKid] = React.useState(false);
  //------------------API CALLS-------------------------
  const { data: kids_data } = useGetAllKids();
  const { mutate: deleteKid } = useDeleteKid();

  //------------------COLUMNS-------------------------
  const kids_columns: ColumnDef<Kid>[] = [
    {
      accessorKey: "id",
      size: 10,
      minSize: 10,
      maxSize: 10,
      header: () => <span>ID</span>,
      cell: (info) => {
        const isFemale = info.row.original.gender === Gender.FEMALE;
        return (
          <div
            className={cn(
              isFemale ? "bg-pink" : "bg-blue",
              "text-white text-center rounded-full py-0.5"
            )}
          >
            {info.row.original.id}
          </div>
        );
      },
    },
    {
      accessorKey: "image",
      header: () => <span>Image</span>,
      cell: (info) => (
        <div>
          {info.row.original.image ? (
            <Image
              src={info.row.original.image}
              alt={info.row.original.firstName}
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
      cell: (info) => <div>{info.row.original.firstName}</div>,
    },
    {
      accessorKey: "lastName",
      header: () => <span>Last Name</span>,
      cell: (info) => <div>{info.row.original.lastName}</div>,
    },
    {
      accessorKey: "dateOfBirth",
      header: () => <span>Age</span>,
      cell: (info) => {
        const dob = info.row.original.dateOfBirth;
        if (!dob) return <div>-</div>;
        const age = Math.floor(
          (new Date().getTime() - new Date(dob).getTime()) /
            (1000 * 60 * 60 * 24 * 365.25)
        );
        return <div>{age}</div>;
      },
    },
    {
      accessorKey: "id",
      header: () => <span>Edit</span>,
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingKid(info.row.original);
              setIsOpen(true);
            }}
            className="border border-red-500 px-2 py-2 rounded-lg text-red-500"
          >
            <FiEdit2 />
          </button>

          <button
            onClick={() => {
              setViewingKid(info.row.original);
              setIsOpenViewingKid(true);
            }}
            className="border border-red-500 px-2 py-2 rounded-lg text-red-500"
          >
            <FiEye />
          </button>
        </div>
      ),
    },
  ];
  //---------------------------RENDER-----------------
  return (
    <div>
      <DashboardTable
        data={kids_data?.data}
        columns={kids_columns}
        deleteMutation={deleteKid}
      />
      <AddEditKidModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingKid={editingKid}
        setEditingKid={setEditingKid}
      />
      {viewingKid && (
        <ViewKidModal
          isOpen={isOpenViewingKid}
          setIsOpen={setIsOpenViewingKid}
          kid={viewingKid}
        />
      )}
    </div>
  );
}

export default KidsTable;
