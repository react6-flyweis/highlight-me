import type { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExportCSVButton } from "@/components/table/ExportCSVButton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <label className="text-sm">Rows per page :</label>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50, 100].map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ExportCSVButton
          rows={table.getFilteredRowModel().rows}
          filename={`export-page-${pageIndex + 1}.csv`}
          className="flex items-center gap-2 h-7 rounded-xl"
        />
      </div>
      <div className="flex gap-2 items-center">
        <div className="ml-2 flex-1 text-muted-foreground font-semibold text-sm">
          {table.getFilteredSelectedRowModel().rows.length > 0
            ? `Selected ${table.getFilteredSelectedRowModel().rows.length} of ${
                table.getFilteredRowModel().rows.length
              }`
            : (() => {
                const pageIndex = table.getState().pagination.pageIndex;
                const pageSize = table.getState().pagination.pageSize;
                const totalRows = table.getFilteredRowModel().rows.length;
                const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
                const end = Math.min((pageIndex + 1) * pageSize, totalRows);
                return `${start}-${end} of ${totalRows}`;
              })()}
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          {/* Page number pagination */}
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Previous page"
              className="h-8 w-8 p-0 rounded-md"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              variant="outline"
            >
              <ChevronLeftIcon className="size-7" />
            </Button>
            {(() => {
              const pageCount = table.getPageCount();
              const pageIndex = table.getState().pagination.pageIndex;
              const pageButtons = [];

              // Show up to 9 page numbers around current page
              const maxVisible = 9;
              const start = Math.max(0, pageIndex - Math.floor(maxVisible / 2));
              const end = Math.min(pageCount, start + maxVisible);

              // Adjust start if we're near the end
              const adjustedStart =
                end - start < maxVisible
                  ? Math.max(0, end - maxVisible)
                  : start;

              for (let i = adjustedStart; i < end; i++) {
                const isActive = pageIndex === i;
                pageButtons.push(
                  <button
                    aria-current={isActive ? "page" : undefined}
                    className={`h-8 w-8 flex items-center justify-center rounded-md border text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-muted-foreground hover:bg-slate-50"
                    }`}
                    key={i}
                    onClick={() => table.setPageIndex(i)}
                    type="button"
                  >
                    {i + 1}
                  </button>
                );
              }

              return pageButtons;
            })()}
            <Button
              aria-label="Next page"
              className="h-8 w-8 p-0 rounded-md"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              variant="outline"
            >
              <ChevronRightIcon className="size-7" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
