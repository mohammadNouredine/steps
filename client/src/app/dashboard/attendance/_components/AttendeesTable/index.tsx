"use client";
import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2 } from "react-icons/fi";
import { Gender } from "@prisma/client";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { BsFillPersonPlusFill } from "react-icons/bs";
import {
  AttendanceType,
  useGetAttendance,
} from "@/app/dashboard/api-hookts/attendance/useGetAttendance";
import { useToggleAttendance } from "@/app/dashboard/api-hookts/attendance/useToggleAttendance";
import AddEditAttendanceModal from "./AddEditAttendanceModal";
import CardContainer from "@/app/dashboard/_common/components/CardContainer";
import { DatePicker, InputPicker } from "rsuite";
import { useGetAllKids } from "@/app/dashboard/api-hookts/kids/useGetAllKids";
import { formatDateToDashes } from "@/helpers/formatDate";
import { FaTrash } from "react-icons/fa6";
import FalseTruePopup from "@/app/dashboard/_common/components/Popups/FalseTruePopup";
import { useDeleteAttendance } from "@/app/dashboard/api-hookts/attendance/useDeleteAttendance";

function AttendeesTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------

  const [editingAttendance, setEditingAttendance] = React.useState<
    AttendanceType | undefined
  >();
  const [isOpenAttendance, setIsOpenAttendance] = React.useState(false);
  const [selectedKidId, setSelectedKidId] = React.useState<
    number | undefined
  >();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedAttendance, setSelectedAttendance] = React.useState<
    AttendanceType | undefined
  >();
  //------------------API CALLS-------------------------
  const { data: kids } = useGetAllKids();
  const kids_options = kids?.data.map((kid) => ({
    label: `${kid.firstName} ${kid.lastName}`,
    value: kid.id,
    ...kid,
  }));
  console.log("SELECTED KID IS: ", selectedKidId);
  const { data: attendance } = useGetAttendance({
    kidId: selectedKidId,
    date: selectedDate ? formatDateToDashes(selectedDate) : undefined,
  });

  const { mutate: deleteAttendance, isPending: isDeleting } =
    useDeleteAttendance();
  //------------------COLUMNS-------------------------
  const kids_columns: ColumnDef<AttendanceType>[] = [
    {
      accessorKey: "id",
      size: 10,
      minSize: 10,
      maxSize: 10,
      header: () => <span>ID</span>,
      cell: (info) => {
        const isFemale = info.row.original.kid.gender === Gender.FEMALE;
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
          {info.row.original.kid.image ? (
            <Image
              className="aspect-square object-cover rounded-lg"
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
      header: () => <span>Name</span>,
      cell: (info) => (
        <div>
          {info.row.original.kid.firstName +
            " " +
            info.row.original.kid.lastName}
        </div>
      ),
    },
    {
      accessorKey: "extraCharge",
      header: () => <span>Extra Charge</span>,
      cell: (info) => {
        return <div>{info.row.original.extraCharge || 0}</div>;
      },
    },
    {
      accessorKey: "note",
      header: () => <span> Note</span>,
      cell: (info) => {
        return <div>{info.row.original.note || "-"}</div>;
      },
    },

    {
      accessorKey: "date",
      header: () => <span>Date</span>,
      cell: (info) => {
        return <div>{info.row.original.date}</div>;
      },
    },
    {
      accessorKey: "id",
      header: () => <span>Delete</span>,
      cell: (info) => {
        return (
          <div>
            <button
              onClick={() => {
                setSelectedAttendance(info.row.original);
                setIsOpenDeleteModal(true);
              }}
              className={cn(
                "border border-red-500 px-2 py-2 rounded-lg text-red-500 ",
                isDeleting &&
                  selectedAttendance?.id === info.row.original.id &&
                  "cursor-not-allowed animate-pulse"
              )}
            >
              <FaTrash />
            </button>
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
              setEditingAttendance(info.row.original);
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
        <CardContainer className="flex items-center gap-x-4">
          <InputPicker
            data={kids_options || []}
            value={selectedKidId}
            searchable
            onChange={(value) => {
              console.log("VALUE TO BE SET IS: ", value);
              setSelectedKidId(value);
            }}
          />
          <DatePicker
            value={selectedDate}
            onChange={(value) => {
              setSelectedDate(value);
            }}
          />
        </CardContainer>
        <DashboardTable data={attendance?.data} columns={kids_columns} />
      </div>

      <AddEditAttendanceModal
        key={"add-edit-attendance-modal"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        kid={editingAttendance?.kid}
        attendanceRecord={editingAttendance}
        setAttendanceRecord={setEditingAttendance}
      />
      <FalseTruePopup
        isOpenModal={isOpenDeleteModal}
        setIsOpenModal={setIsOpenDeleteModal}
        title="Delete Attendance"
        subtitle="Are you sure that this kid didnt attend at that day?"
        onClick={() => {
          deleteAttendance({
            attendanceId: selectedAttendance?.id || 0,
          });
          setIsOpenDeleteModal(false);
        }}
      />
    </div>
  );
}

export default AttendeesTable;
