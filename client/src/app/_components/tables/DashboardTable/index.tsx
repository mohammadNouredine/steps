"use client";
import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  Row,
  RowData,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { UseMutateFunction } from "@tanstack/react-query";
import { DeleteDataParams } from "@/api/api-service/useDeleteData";
import { LuTrash2 } from "react-icons/lu";
import FalseTruePopup from "@/app/dashboard/_common/components/Popups/FalseTruePopup";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    inverse: boolean;
    hideCircle: boolean;
    // Example usage of TData and TValue:
    customRenderer?: (value: TValue, data: TData) => React.ReactNode;
  }
}
export function DashboardTable({
  hasRefresh,
  data,
  total = 0,
  columns,
  deleteMutation,
  deletingTitle,
  pagination = {
    pageIndex: 1,
    pageSize: 10,
  },
  setPagination = () => {},
  setSelectedRows,
  hasSelection = false,
}: {
  hasRefresh?: boolean;

  data: any;
  total?: number;
  columns: any;
  deleteMutation?: UseMutateFunction<
    any,
    Error,
    DeleteDataParams | undefined,
    unknown
  >;
  deletingTitle?: string;
  pagination?: PaginationState;
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
  hasSelection?: boolean;
  setSelectedRows?: React.Dispatch<React.SetStateAction<unknown[]>>;
}) {
  const [selectedRowId, setSelectedRowId] = React.useState<number | null>(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);

  // Extend columns with delete functionality if deleteFn is provided
  const enhancedColumns = React.useMemo(() => {
    const baseColumns = [...columns];
    if (deleteMutation) {
      baseColumns.push({
        id: "delete",
        header: () => <span>Delete</span>,
        cell: (info: any) => (
          <button
            className="border border-red-500 px-2 py-2 rounded-lg text-red-500"
            onClick={() => {
              setSelectedRowId(info.row.original.id);
              setIsOpenDeleteModal(true);
            }}
          >
            <LuTrash2 />
          </button>
        ),
      });
    }
    if (hasSelection) {
      baseColumns.push({
        id: "select",
        header: ({ table }: { table: Table<RowData> }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }: { row: Row<RowData> }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      });
    }
    return baseColumns;
  }, [columns, deleteMutation]);

  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data: data || [],
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    onPaginationChange: (newPagination) => {
      console.log("NEW PAGINATION", newPagination);
      setPagination(newPagination);
    },
    rowCount: total,
    pageCount: Math.ceil(total / pagination.pageSize) || 1,
    state: {
      pagination,
    },
  });

  //-------------------UPDATE SELECTED ROWS----------------
  React.useEffect(() => {
    if (setSelectedRows) {
      setSelectedRows(
        table.getSelectedRowModel().flatRows.map((row) => row.original)
      );
    }
  }, [table.getState().rowSelection]);

  const loadingTableRows = (
    <tbody className="px-4">
      {Array.from({ length: 10 }).map((_, rowIdx) => (
        <tr key={`loading-row-${rowIdx}`}>
          {table.getAllColumns().map((_, colIdx) => (
            <td
              key={`loading-row-${rowIdx}-cell-${colIdx}`}
              className="px-2 py-3"
            >
              <div className="h-5 w-full bg-gray-200 rounded-full animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className="w-full custom-scrollbar-x-container ">
      <table className="shadow-[0_0_2px_0_rgba(0,0,0,0.1)] rounded-lg  bg-white w-full ">
        <thead className="">
          {table.getHeaderGroups().map((headerGroup, hgIndex) => (
            <tr key={`header-group-${hgIndex}`}>
              {headerGroup.headers.map((header, hIndex) => (
                <th
                  key={`header-${hgIndex}-${hIndex}`}
                  className="px-4 py-4 font-normal text-gray-400 text-start"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {!data ? (
          <>{loadingTableRows}</>
        ) : (
          <tbody className="px-4 ">
            {table.getRowModel().rows.map((row, rowIdx) => (
              <tr key={`data-row-${rowIdx}`}>
                {row.getVisibleCells().map((cell, cellIdx) => {
                  const inverse = cell.column.columnDef.meta?.inverse || false;
                  const shouldHideCircle =
                    cell.column.columnDef.meta?.hideCircle;

                  return (
                    <td
                      key={`cell-${rowIdx}-${cellIdx}`}
                      className="px-4 py-4 border-t border-gray-200 "
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}

                      {typeof cell.getValue() === "boolean" &&
                      !shouldHideCircle ? (
                        cell.getValue() ? (
                          inverse ? (
                            <IoIosCloseCircle className="text-red-500 text-xl" />
                          ) : (
                            <IoIosCheckmarkCircle className="text-green text-xl" />
                          )
                        ) : inverse ? (
                          <IoIosCheckmarkCircle className="text-green text-xl" />
                        ) : (
                          <IoIosCloseCircle className="text-red-500 text-xl" />
                        )
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        )}
        <tfoot className="text-gray-300 ">
          {table.getFooterGroups().map((footerGroup, fgIdx) => (
            <tr key={`footer-group-${fgIdx}`}>
              {footerGroup.headers.map((footer, fIdx) => (
                <th
                  key={`footer-${fgIdx}-${fIdx}`}
                  className="px-4 py-4 text-start !font-thin"
                >
                  {footer.isPlaceholder
                    ? null
                    : flexRender(
                        footer.column.columnDef.footer,
                        footer.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      {/* PAGINATION */}
      {data && (
        <>
          {" "}
          <div className="h-2" />
          <div className="flex items-center gap-2">
            <button
              className="border rounded p-1"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount().toLocaleString()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      {/* REFRESH */}
      {hasRefresh && (
        <>
          <div className="h-4" />
          <button onClick={() => rerender()} className="border p-2">
            Rerender
          </button>
        </>
      )}
      {/* <button onClick={() => console.log(table.getSelectedRowModel().rows)}>
        selected
      </button> */}
      <FalseTruePopup
        isOpenModal={isOpenDeleteModal}
        setIsOpenModal={setIsOpenDeleteModal}
        title={deletingTitle || "Delete"}
        subtitle="Are you sure you want to delete this Record?"
        onClick={() => {
          if (deleteMutation) {
            deleteMutation({
              additionalEndpoint: `${selectedRowId}`,
            });
            setIsOpenDeleteModal(false);
          }
        }}
      />
    </div>
  );
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}
