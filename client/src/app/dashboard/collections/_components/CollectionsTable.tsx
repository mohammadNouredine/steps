"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { DashboardCollection } from "../../_common/types/collection";

const columnHelper = createColumnHelper<DashboardCollection>();
import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { useGetAllCollections } from "../../api-hookts/collection/useGetAllCollections";
import { useDeleteCollection } from "../../api-hookts/collection/useDeleteCollection";
import { FiEdit2 } from "react-icons/fi";
import AddEditCollectionModal from "./AddEditCollectionModal";
import { FaEye, FaPlus } from "react-icons/fa6";
import AddProductsToCollectionModal from "./AddProductsToCollectionModal";
import Image from "next/image";
import ChooseAppearingProductsModal from "./ChooseAppearingProductsModal";

function CollectionsTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------

  const [editingCollection, setEditingCollection] = React.useState<
    DashboardCollection | undefined
  >();
  const [isOepnAddProductModal, setIsOpenAddProductModal] =
    React.useState(false);
  const [isOpenChooseAppearingModal, setIsOpenChooseAppearingModal] =
    React.useState(false);
  //------------------API CALLS-------------------------
  const { data: collections_data } = useGetAllCollections({
    withProducts: true,
  });
  const { mutate: deleteCollection } = useDeleteCollection();

  //------------------COLUMNS-------------------------
  const collections_columns = [
    columnHelper.accessor("id", {
      header: () => <span>ID</span>,
      cell: (info) => <div>{info.row.original.id}</div>,
    }),
    columnHelper.display({
      id: "image",
      header: () => <span>Image</span>,
      cell: (info) => {
        const imageUrl = info.row.original.media?.[0]?.url;
        if (!imageUrl) return <div></div>;
        return (
          <div>
            <Image
              src={info.cell.row.original.media?.[0].url || ""}
              alt="collection image"
              width={100}
              height={100}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("name", {
      header: () => <span>Collection Name</span>,
      cell: (info) => <div>{info.row.original.name}</div>,
    }),
    columnHelper.accessor("id", {
      header: () => <span>Actions</span>,
      cell: (info) => (
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setEditingCollection(info.row.original);
              setIsOpen(true);
            }}
            className="border border-red-500 px-2 py-2 rounded-lg text-red-500"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => {
              setEditingCollection(info.row.original);
              setIsOpenAddProductModal(true);
            }}
            className="border border-red-500 px-2 py-2 rounded-lg text-red-500"
          >
            <FaPlus />
          </button>
          <button
            onClick={() => {
              setEditingCollection(info.row.original);
              setIsOpenChooseAppearingModal(true);
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
    <div>
      <DashboardTable
        data={collections_data}
        columns={collections_columns}
        deleteMutation={deleteCollection}
      />
      <AddEditCollectionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingCollection={editingCollection}
        setEditingCollection={setEditingCollection}
      />
      <AddProductsToCollectionModal
        isOpen={isOepnAddProductModal}
        setIsOpen={setIsOpenAddProductModal}
        editingCollection={editingCollection}
      />
      <ChooseAppearingProductsModal
        isOpen={isOpenChooseAppearingModal}
        setIsOpen={setIsOpenChooseAppearingModal}
        editingCollection={editingCollection}
      />
    </div>
  );
}

export default CollectionsTable;
