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
import CardContainer from "../../_common/components/CardContainer";
import SearchInput from "@/components/fields/form/SearchInput";
import IconButton from "@/components/common/ui/IconButton";
import { FaMoneyBill, FaPrint } from "react-icons/fa6";
import PrintAllKidsModal from "./PrintAllKidsModal";
import SelectFieldControlled from "@/components/fields/controlled/SelectFieldControlled";
import { useGetAllSubscriptionPlans } from "../../api-hookts/subscriptions/subscription-plans/useGetAllSubscriptionPlans";
import ToolTipWrapper from "@/components/common/ui/ToolTipWrapper";
import { usePermissions } from "@/hooks/usePermissions";
import AddEditPaymentModal from "../../payments/_components/PaymentsTable/AddEditPaymentModal";

function KidsTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------

  const [editingKid, setEditingKid] = React.useState<Kid | undefined>();
  const [viewingKid, setViewingKid] = React.useState<KidType | undefined>();
  const [isOpenViewingKid, setIsOpenViewingKid] = React.useState(false);
  const [isOpenAttendance, setIsOpenAttendance] = React.useState(false);
  const [isAttendanceMode, setIsAttendanceMode] = React.useState(false);
  const [isOpenPrintAllKids, setIsOpenPrintAllKids] = React.useState(false);
  const [selectedSubscriptionTypeId, setSelectedSubscriptionTypeId] =
    React.useState<number | undefined>();
  const [selectedGender, setSelectedGender] = React.useState<
    Gender | undefined
  >();
  const [showOnlyWithLoan, setShowOnlyWithLoan] = React.useState(false);
  const [isOpenPayments, setIsOpenPayments] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  //------------------API CALLS-------------------------

  const { data: subscriptionPlans } = useGetAllSubscriptionPlans();
  const { data: kids_data } = useGetAllKids();
  const filteredKids = kids_data?.data.filter((kid) => {
    if (selectedSubscriptionTypeId) {
      console.log("SELECTED SUBSCRIPTION TYPE", selectedSubscriptionTypeId);
      if (kid.subscriptionPlan?.id !== selectedSubscriptionTypeId) {
        return false;
      }
    }
    if (selectedGender) {
      if (kid.gender !== selectedGender) {
        return false;
      }
    }
    if (showOnlyWithLoan) {
      if (kid.loanBalance === 0) {
        return false;
      }
    }
    return (
      kid.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kid.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kid?.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const { mutate: deleteKid } = useDeleteKid();
  const { mutate: toggleAttendance } = useToggleAttendance();
  const { canSeeLoanBalance, canSeeLoanFilter, canAddPayment } =
    usePermissions();
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
              const index = info.row.index + 1;
              return (
                <div
                  className={cn(
                    isFemale ? "bg-pink" : "bg-blue",
                    "text-white text-center rounded-full py-0.5"
                  )}
                >
                  {index}
                </div>
              );
            },
          },
        ]
      : []),
    {
      accessorKey: "image",
      header: () => <span>Image</span>,
      enableSorting: false,
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
      enableSorting: false,
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
            cell: (info: CellContext<KidType, unknown>) => {
              if (!canSeeLoanBalance()) return <div>-</div>;
              return <div>{info.row.original.loanBalance} </div>;
            },
          },
          {
            accessorKey: "subscriptionPlan",
            header: () => <span> Plan</span>,
            cell: (info: CellContext<KidType, unknown>) => {
              const plan = info.row.original.subscriptionPlan;
              if (!plan) return <div>-</div>;
              return <div>{plan.name}</div>;
            },
          },

          {
            accessorKey: "dateOfBirth",
            header: () => <span>Age</span>,
            sortingFn: (
              rowA: { original: KidType },
              rowB: { original: KidType }
            ) => {
              const dobA = rowA.original.dateOfBirth;
              const dobB = rowB.original.dateOfBirth;
              if (!dobA || !dobB) return 0;
              return new Date(dobA).getTime() - new Date(dobB).getTime();
            },
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
      enableSorting: false,
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
                  date: new Date(),
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
            header: () => <span>Actions</span>,
            enableSorting: false,
            cell: (info: CellContext<KidType, unknown>) => (
              <div className="flex gap-2">
                {canAddPayment() && (
                  <IconButton
                    toolTip="الدفع"
                    onClick={() => {
                      setViewingKid(info.row.original);
                      setIsOpenPayments(true);
                    }}
                    Icon={FaMoneyBill}
                    style={"gray"}
                  />
                )}

                <IconButton
                  toolTip="إضافة الحضور"
                  onClick={() => {
                    setViewingKid(info.row.original);
                    setIsOpenAttendance(true);
                  }}
                  Icon={BsFillPersonPlusFill}
                  style={"red"}
                />

                <IconButton
                  toolTip="تعديل الطفل"
                  onClick={() => {
                    setEditingKid(info.row.original);
                    setIsOpen(true);
                  }}
                  Icon={FiEdit2}
                  style={"green"}
                />

                <IconButton
                  toolTip="عرض الطفل"
                  onClick={() => {
                    setViewingKid(info.row.original);
                    setIsOpenViewingKid(true);
                  }}
                  Icon={FiEye}
                  style={"yellow"}
                />
              </div>
            ),
          },
        ]
      : []),
  ];
  //---------------------------RENDER-----------------
  return (
    <div>
      <CardContainer className="flex flex-wrap items-center gap-x-4  space-y-2 mb-2">
        <div className="w-[20rem]">
          <SearchInput value={searchQuery} setValue={setSearchQuery} />
        </div>
        <SelectFieldControlled
          toolTip="اختر نوع الاشتراك"
          name="subscriptionType"
          placeHolder="Subscription Type"
          data={
            subscriptionPlans?.map((plan) => ({
              label: plan.name,
              value: plan.id,
              ...plan,
            })) || []
          }
          value={selectedSubscriptionTypeId}
          onChange={(value) => {
            setSelectedSubscriptionTypeId(value);
          }}
        />

        <SelectFieldControlled
          toolTip="اختر الجنس"
          name="gender"
          placeHolder="Gender"
          data={[
            { label: "Male", value: Gender.MALE },
            { label: "Female", value: Gender.FEMALE },
          ]}
          value={selectedGender}
          onChange={(value) => {
            setSelectedGender(value);
          }}
        />
        {canSeeLoanFilter() && (
          <ToolTipWrapper toolTip="اظهر الأطفال الذين لديهم قرض">
            <Checkbox
              checked={showOnlyWithLoan}
              onChange={(_, checked) => {
                setShowOnlyWithLoan(checked);
              }}
              title="Show only kids with loan"
            >
              <p className="text-gray-900 font-medium">
                Show only kids with loan
              </p>
            </Checkbox>
          </ToolTipWrapper>
        )}
        <ToolTipWrapper toolTip="اظهر الأطفال الذين لديهم حضور">
          <Checkbox
            checked={isAttendanceMode}
            onChange={(_, checked) => {
              setIsAttendanceMode(checked);
            }}
            title="Show only attendance"
          >
            <p className="text-gray-900 font-medium">Attendance Mode</p>
          </Checkbox>
        </ToolTipWrapper>
        <IconButton
          onClick={() => setIsOpenPrintAllKids(true)}
          Icon={FaPrint}
          toolTip="طباعة الأطفال"
          style={"yellow"}
        />
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
      <PrintAllKidsModal
        isOpen={isOpenPrintAllKids}
        setIsOpen={setIsOpenPrintAllKids}
        kids={filteredKids || []}
      />
      {viewingKid && (
        <ViewKidModal
          isOpen={isOpenViewingKid}
          setIsOpen={setIsOpenViewingKid}
          kid={viewingKid}
        />
      )}
      <AddEditPaymentModal
        isOpen={isOpenPayments}
        setIsOpen={setIsOpenPayments}
        kid={viewingKid}
      />
    </div>
  );
}

export default KidsTable;
