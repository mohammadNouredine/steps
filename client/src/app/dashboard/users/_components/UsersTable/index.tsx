"use client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2 } from "react-icons/fi";
import SearchInput from "@/components/fields/form/SearchInput";
import AddEditUserModal from "./AddEditUserModal";
import { User } from "@/types/user";
import IconButton from "@/components/common/ui/IconButton";
import { FaUserPlus } from "react-icons/fa6";
import CardContainer from "@/app/dashboard/_common/components/CardContainer";
import { useGetUsers } from "@/app/dashboard/api-hookts/users/useGetUsers";
import { useDeleteUser } from "@/app/dashboard/api-hookts/users/useDeleteUser";
import EditUserPermissionsModal from "./EditUserPermissionsModal";

function UsersTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------

  const [editingUser, setEditingUser] = React.useState<User | undefined>();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isOpenEditPermissions, setIsOpenEditPermissions] =
    React.useState(false);

  //------------------API CALLS-------------------------

  const { data: usersData } = useGetUsers();
  const filteredUsersData = usersData?.data?.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { mutate: deleteUser } = useDeleteUser({});
  //------------------COLUMNS-------------------------
  const users_columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: () => <span>Username</span>,
      cell: (info: any) => <div>{info.row.original.username}</div>,
    },
    { accessorKey: "email", header: () => <span>Email</span> },
    { accessorKey: "role", header: () => <span>Role</span> },
    {
      accessorKey: "isActive",
      header: () => <span>Active</span>,
      cell: () => <></>,
    },

    {
      accessorKey: "id",
      header: () => <span>Edit</span>,
      cell: (info) => (
        <div className="flex gap-2">
          <IconButton
            style="yellow"
            onClick={() => {
              setIsOpenEditPermissions(true);
              setEditingUser(info.row.original);
            }}
            Icon={FaUserPlus}
          />
          <IconButton
            style="green"
            onClick={() => {
              setIsOpen(true);
              setEditingUser(info.row.original);
            }}
            Icon={FiEdit2}
          />
        </div>
      ),
    },
  ];

  //---------------------------RENDER-----------------
  return (
    <div>
      <div className="space-y-4 mt-4">
        <CardContainer className="flex items-center gap-x-4 flex-wrap space-y-2">
          <div className="w-[20rem]">
            <SearchInput value={searchQuery} setValue={setSearchQuery} />
          </div>
        </CardContainer>
        <DashboardTable
          data={filteredUsersData}
          columns={users_columns}
          // pagination={pagination}
          // setPagination={setPagination}
          deleteMutation={deleteUser}
        />
      </div>

      <AddEditUserModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />
      <EditUserPermissionsModal
        isOpen={isOpenEditPermissions}
        setIsOpen={setIsOpenEditPermissions}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />
    </div>
  );
}

export default UsersTable;
