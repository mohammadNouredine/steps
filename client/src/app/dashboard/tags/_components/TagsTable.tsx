"use client";
import { createColumnHelper } from "@tanstack/react-table";

import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2 } from "react-icons/fi";
import AddEditCollectionModal from "./AddEditTagModal";
import { DashboardTag } from "../../_common/types/tag";
import { useGetAllTags } from "../../api-hookts/tag/useGetAllTags";
import { useDeleteTag } from "../../api-hookts/tag/useDeleteTag";

const columnHelper = createColumnHelper<DashboardTag>();
function TagsTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------

  const [editingTag, setEditingTag] = React.useState<
    DashboardTag | undefined
  >();
  //------------------API CALLS-------------------------
  const { data: tags_data } = useGetAllTags();
  const { mutate: deleteTag } = useDeleteTag();

  //------------------COLUMNS-------------------------
  const tags_columns = [
    columnHelper.accessor("id", {
      header: () => <span>ID</span>,
      cell: (info) => <div>{info.row.original.id}</div>,
    }),
    columnHelper.accessor("name", {
      header: () => <span>Tag Name</span>,
      cell: (info) => <div>{info.row.original.name}</div>,
    }),
    columnHelper.accessor("id", {
      header: () => <span>Edit</span>,
      cell: (info) => (
        <button
          onClick={() => {
            setEditingTag(info.row.original);
            setIsOpen(true);
          }}
          className="border border-red-500 px-2 py-2 rounded-lg text-red-500"
        >
          <FiEdit2 />
        </button>
      ),
    }),
  ];
  //---------------------------RENDER-----------------
  return (
    <div>
      <DashboardTable
        data={tags_data}
        columns={tags_columns}
        deleteMutation={deleteTag}
      />
      <AddEditCollectionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingTag={editingTag}
        setEditingTag={setEditingTag}
      />
    </div>
  );
}

export default TagsTable;
