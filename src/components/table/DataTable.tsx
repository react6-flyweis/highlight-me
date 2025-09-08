"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Table as ReactTable,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./Pagination";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchableColumns?: {
    id: string;
    title: string;
  }[];
  tWrapperClassName?: string;
  showToolbar?: boolean;
  showPagination?: boolean;
  pageSize?: number;
}

function DataTableInner<TData, TValue>(
  {
    tWrapperClassName,
    columns,
    data,
    showPagination = true,
    pageSize = 5, // Default page size
  }: DataTableProps<TData, TValue>,
  ref: React.ForwardedRef<ReactTable<TData>>
) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  useImperativeHandle(ref, () => table, [table]);
  const pageCount = table.getPageCount();
  return (
    <div className="space-y-4 ">
      <div
        className={cn(
          "overflow-hidden  border shadow-sm rounded-md bg-white",
          tWrapperClassName
        )}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="h-12 " key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="px-5" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="h-12 py-2" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="h-12 px-5 py-2" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && pageCount > 1 && <DataTablePagination table={table} />}
    </div>
  );
}

export type DataTableRef<TData> = ReactTable<TData>;
const DataTable = forwardRef(DataTableInner) as <TData, TValue>(
  props: DataTableProps<TData, TValue> & {
    ref?: React.ForwardedRef<ReactTable<TData>>;
  }
) => ReturnType<typeof DataTableInner>;
export { DataTable };
