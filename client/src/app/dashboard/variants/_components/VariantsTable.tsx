"use client";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<DashboardVariant>();
import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2 } from "react-icons/fi";
import AddEditVariantModal from "./AddEditVariantModal";
import { useGetAllVariants } from "../../api-hookts/variant/useGetAllVariants";
import { useDeleteVariant } from "../../api-hookts/variant/useDeleteVariant";
import { DashboardVariant } from "../../_common/types/variants";

function VariantsTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------

  const [editingVariant, setEditingVariant] = React.useState<
    DashboardVariant | undefined
  >();
  //------------------API CALLS-------------------------
  const { data: variants_data } = useGetAllVariants();
  const { mutate: deleteVariant } = useDeleteVariant();

  //------------------COLUMNS-------------------------
  const variant_columns = [
    columnHelper.accessor("id", {
      header: () => <span>ID</span>,
      cell: (info) => <div>{info.row.original.id}</div>,
    }),
    columnHelper.accessor("name", {
      header: () => <span>Variant Name</span>,
      cell: (info) => <div>{info.row.original.name}</div>,
    }),
    columnHelper.accessor("variantOptions", {
      header: () => <span>Variant Options</span>,
      cell: (info) => (
        <div>
          {info.row.original.variantOptions.flatMap((v) => v.name).join(", ")}
        </div>
      ),
    }),

    columnHelper.accessor("id", {
      header: () => <span>Edit</span>,
      cell: (info) => (
        <button
          onClick={() => {
            setEditingVariant(info.row.original);
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
        data={variants_data}
        columns={variant_columns}
        deleteMutation={deleteVariant}
      />
      <AddEditVariantModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingVariant={editingVariant}
        setEditingVariant={setEditingVariant}
      />
    </div>
  );
}

export default VariantsTable;
