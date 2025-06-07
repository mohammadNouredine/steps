"use client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import CardContainer from "@/app/dashboard/_common/components/CardContainer";
import SearchInput from "@/components/fields/form/SearchInput";
import { useGetContactMessages } from "@/app/dashboard/api-hookts/contact/useGetContactMessages";
import { ContactMessage } from "@prisma/client";
import { useDeleteContactMessage } from "@/app/dashboard/api-hookts/contact/useDeleteContactMessage";

function ContactMessagesTable() {
  //------------------STATES-------------------------

  const [searchQuery, setSearchQuery] = React.useState<string | undefined>(
    undefined
  );
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  //------------------API CALLS-------------------------
  const { data: contactMessagesData } = useGetContactMessages({
    search: searchQuery,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const { mutate: deleteContactMessage } = useDeleteContactMessage();
  //------------------COLUMNS-------------------------
  const payments_columns: ColumnDef<ContactMessage>[] = [
    {
      accessorKey: "name",
      header: () => <span>Name</span>,
      cell: (info: any) => <div>{info.row.original.name}</div>,
    },
    { accessorKey: "email", header: () => <span>Email</span> },
    { accessorKey: "phone", header: () => <span>Phone</span> },
    { accessorKey: "childName", header: () => <span>Child Name</span> },
    { accessorKey: "childAge", header: () => <span>Child Age</span> },
    { accessorKey: "message", header: () => <span>Message</span> },
  ];

  //---------------------------RENDER-----------------
  return (
    <div>
      <div className="space-y-4 mt-4">
        <CardContainer className="flex items-center gap-x-4 flex-wrap space-y-2">
          <div className="w-[20rem]">
            <SearchInput value={searchQuery ?? ""} setValue={setSearchQuery} />
          </div>
        </CardContainer>
        <DashboardTable
          data={contactMessagesData?.data}
          columns={payments_columns}
          pagination={pagination}
          setPagination={setPagination}
          deleteMutation={deleteContactMessage}
        />
      </div>
    </div>
  );
}

export default ContactMessagesTable;
