"use client";
import { CellContext, ColumnDef } from "@tanstack/react-table";

import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2, FiEye } from "react-icons/fi";
import { KidType, useGetAllKids } from "../../api-hookts/kids/useGetAllKids";
import { useDeleteKid } from "../../api-hookts/kids/useDeleteKid";
import { Gender, Kid } from "@prisma/client";
import AddEditKidModal from "./AddEditKidModal";
import Image from "next/image";
import { cn } from "@/utils/cn";
import ViewKidModal from "./ViewKidModal";
import { BsFillPersonPlusFill } from "react-icons/bs";
import AddEditAttendanceModal from "../../attendance/_components/AttendeesTable/AddEditAttendanceModal";
import { Checkbox } from "rsuite";
import { useToggleAttendance } from "../../api-hookts/attendance/useToggleAttendance";
import { formatDateToDashes } from "@/helpers/formatDate";
import CardContainer from "../../_common/components/CardContainer";
import SearchInput from "@/components/fields/form/SearchInput";

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
  const [isOpenAttendance, setIsOpenAttendance] = React.useState(false);
  const [isAttendanceMode, setIsAttendanceMode] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  //------------------API CALLS-------------------------
  const { data: kids_data } = useGetAllKids();
  const filteredKids = kids_data?.data.filter((kid) => {
    return (
      kid.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kid.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kid?.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const { mutate: deleteKid } = useDeleteKid();
  const { mutate: toggleAttendance } = useToggleAttendance();
  //------------------COLUMNS-------------------------
  const kids_columns: ColumnDef<KidType>[] = [
    ...(!isAttendanceMode
      ? [
          {
            accessorKey: "id",
            size: 10,
            minSize: 10,
            maxSize: 10,
            header: () => <span>ID</span>,
            cell: (info: CellContext<KidType, unknown>) => {
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
        ]
      : []),
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
      header: () => <span>Name</span>,
      cell: (info) => (
        <div>
          {info.row.original.firstName} {info.row.original.lastName}
        </div>
      ),
    },

    ...(!isAttendanceMode
      ? [
          {
            accessorKey: "loanBalance",
            header: () => <span>Loan</span>,
          },

          {
            accessorKey: "dateOfBirth",
            header: () => <span>Age</span>,
            cell: (info: CellContext<KidType, unknown>) => {
              const dob = info.row.original.dateOfBirth;
              if (!dob) return <div>-</div>;
              const age = Math.floor(
                (new Date().getTime() - new Date(dob).getTime()) /
                  (1000 * 60 * 60 * 24 * 365.25)
              );
              return <div>{age}</div>;
            },
          },
        ]
      : []),
    {
      meta: {
        inverse: false,
        hideCircle: true,
      },
      accessorKey: "hasAttendedToday",
      header: () => <span>Attended Today</span>,
      cell: (info) => {
        const hasAttendedToday = info.row.original.hasAttendedToday;
        return (
          <div className="!cursor-pointer">
            <Checkbox
              className="!cursor-pointer"
              checked={hasAttendedToday}
              onChange={() => {
                toggleAttendance({
                  kidId: info.row.original.id,
                  date: formatDateToDashes(new Date()),
                });
              }}
            />
          </div>
        );
      },
    },

    ...(!isAttendanceMode
      ? [
          {
            accessorKey: "id",
            header: () => <span>Edit</span>,
            cell: (info: CellContext<KidType, unknown>) => (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setViewingKid(info.row.original);
                    setIsOpenAttendance(true);
                  }}
                  className="border border-red-500 px-2 py-2 rounded-lg text-red-500"
                >
                  <BsFillPersonPlusFill />
                </button>
                <button
                  onClick={() => {
                    setEditingKid(info.row.original);
                    setIsOpen(true);
                  }}
                  className="border border-green px-2 py-2 rounded-lg text-green"
                >
                  <FiEdit2 />
                </button>

                <button
                  onClick={() => {
                    setViewingKid(info.row.original);
                    setIsOpenViewingKid(true);
                  }}
                  className="border border-blue px-2 py-2 rounded-lg text-blue"
                >
                  <FiEye />
                </button>
              </div>
            ),
          },
        ]
      : []),
  ];
  //---------------------------RENDER-----------------
  return (
    <div>
      <CardContainer className="flex items-center gap-x-4  space-y-2">
        <SearchInput value={searchQuery} setValue={setSearchQuery} />
        <Checkbox
          checked={isAttendanceMode}
          onChange={(_, checked) => {
            setIsAttendanceMode(checked);
          }}
          title="Show only attendance"
        >
          <p className="text-gray-900 font-medium">Attendance Mode</p>
        </Checkbox>
      </CardContainer>
      <DashboardTable
        showDelete={!isAttendanceMode}
        data={filteredKids}
        columns={kids_columns}
        deleteMutation={deleteKid}
      />
      <AddEditKidModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingKid={editingKid}
        setEditingKid={setEditingKid}
      />
      <AddEditAttendanceModal
        isOpen={isOpenAttendance}
        setIsOpen={setIsOpenAttendance}
        kid={viewingKid}
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
