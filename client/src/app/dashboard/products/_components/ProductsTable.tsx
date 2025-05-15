"use client";
import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2, FiPlus } from "react-icons/fi";
import { useGetAllProductsDashboard } from "../../api-hookts/product/useGetAllProducts";
import Image from "next/image";
import { DashboardProduct } from "../../_common/types/product";
import AddEditProductModal from "./AddEditProductModal";
import { useDeleteProduct } from "../../api-hookts/product/useDeleteProduct";
import SearchInput from "@/components/fields/form/SearchInput";
import useDebounce from "@/hooks/useDebounce";
import AddStockModal from "./stockModals/AddStockModal";

const columnHelper = createColumnHelper<DashboardProduct>();

function ProductsTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------

  const [isOpenAddStockModal, setIsOpenAddStockModal] = React.useState(false);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [editingProduct, setEditingProduct] = React.useState<
    DashboardProduct | undefined
  >();
  //------------------API CALLS-------------------------
  const { data: productsResponse, isFetching } = useGetAllProductsDashboard({
    searchQuery: debouncedSearchQuery,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });
  const products_data = productsResponse?.products;

  const { mutate: deleteProduct } = useDeleteProduct();

  //------------------COLUMNS-------------------------
  const products_columns = [
    columnHelper.accessor("id", {
      header: () => <span>Id</span>,
      cell: (info) => (
        <div className="flex gap-x-2">{info.row.original.id}</div>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.display({
      id: "image",
      header: () => <span>Image</span>,
      cell: (info) => (
        <div className="flex gap-x-2">
          {info.row.original.media && info.row.original.media.length > 0 && (
            <Image
              className="rounded-lg aspect-square object-cover shadow-[0_0_0px_1px_rgba(0,0,0,.1)] size-12"
              src={info.row.original.media[0].url}
              alt={info.row.original.name}
              width={500}
              height={500}
            />
          )}
        </div>
      ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("name", {
      header: () => <span>Name</span>,
      cell: (info) => (
        <div className="flex gap-x-2">{info.row.original.name}</div>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.display({
      id: "age",
      header: () => <span>Age</span>,
      cell: (info) => (
        <div>
          {info.row.original.maxAge} - {info.row.original.minAge}
        </div>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("gender", {
      header: () => <span>Gender</span>,
      cell: (info) => <div>{info.row.original.gender}</div>,
      footer: (info) => info.column.id,
    }),

    columnHelper.display({
      id: "size",
      header: () => <span>Size</span>,
      cell: (info) => (
        <div>
          {info.row.original.width} x {info.row.original.height} cm
        </div>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("isVisible", {
      header: () => <span>Visible</span>,
      cell: (info) => <div>{info.row.original.isVisible}</div>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("outOfStock", {
      header: () => <span>Stock</span>,
      cell: (info) => <div>{info.row.original.outOfStock ? false : true}</div>,
      footer: (info) => info.column.id,
      meta: {
        inverse: true,
      },
    }),
    columnHelper.accessor("isFeatured", {
      header: () => <span>Featured</span>,
      cell: (info) => <div>{info.row.original.isFeatured}</div>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("base_cost", {
      header: () => <span>Cost</span>,
      cell: (info) => <div>{info.row.original.base_cost}</div>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("base_price", {
      header: () => <span>Price</span>,
      cell: (info) => <div>{info.row.original.base_price}</div>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("base_weight", {
      header: () => <span>Weight</span>,
      cell: (info) => <div>{info.row.original.base_weight}</div>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("amount_selled", {
      header: () => <span>Amount Sold</span>,
      cell: (info) => <div>{info.row.original.amount_selled}</div>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("stock", {
      header: () => <span>Stock</span>,
      cell: (info) => (
        <button
          onClick={() => {
            setEditingProduct(info.row.original);
            setIsOpenAddStockModal(true);
          }}
          className="border flex gap-x-2 items-center border-red-500 px-2 py-2 rounded-lg text-red-500"
        >
          <FiPlus />
          {info.row.original.stock}
        </button>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("id", {
      header: () => <span>Edit</span>,
      cell: (info) => (
        <button
          disabled={isFetching}
          onClick={() => {
            setEditingProduct(info.row.original);
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
      <SearchInput value={searchQuery} setValue={setSearchQuery} />
      <DashboardTable
        data={products_data}
        columns={products_columns}
        deleteMutation={deleteProduct}
        deletingTitle="Delete Product"
        total={productsResponse?.total}
        pagination={pagination}
        setPagination={setPagination}
      />
      <AddEditProductModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
      />
      <AddStockModal
        isOpen={isOpenAddStockModal}
        setIsOpen={setIsOpenAddStockModal}
        setEditingProduct={setEditingProduct}
        editingProduct={editingProduct}
      />
    </div>
  );
}

export default ProductsTable;
