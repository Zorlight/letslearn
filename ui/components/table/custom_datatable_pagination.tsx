"use client";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/lib/shadcn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/shadcn/select";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  config: DataTablePaginationConfig;
}

interface DataTablePaginationConfig {
  showRowSelectedCounter: boolean;
}

export function CustomDataTablePagination<TData>({
  table,
  config,
}: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = (pageIndex: number) => {
    if (!searchParams.get("page") || !searchParams.get("size")) {
      table.setPageIndex(pageIndex);
    } else {
      const params = createQueryString("page", (pageIndex + 1).toString());
      router.push(`${pathname}?${params}`);
    }
  };

  const handlePageSizeChange = (pageSize: string) => {
    table.setPageSize(Number(pageSize));

    if (!searchParams.get("page") || !searchParams.get("size")) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("size", pageSize);

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between text-sm text-gray-800",
        config.showRowSelectedCounter ? "visible" : "hidden"
      )}
    >
      <div
        className={cn(
          "flex text-sm text-muted-foreground",
          !table.getColumn("select") && "opacity-0 select-none"
        )}
      >
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      {table.getPageCount() > 0 ? (
        <div className="flex flex-row gap-2">
          <Button
            className={cn(
              "hidden h-8 w-8 p-0 lg:flex whitespace-nowrap bg-white hover:bg-gray-200 border disabled:hover:bg-white",
              "dark:bg-white/10 dark:hover:bg-white/20 dark:disabled:hover:bg-white/10"
            )}
            onClick={() => handlePageChange(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            className={cn(
              "h-8 w-8 p-0 whitespace-nowrap bg-white hover:bg-gray-200 border disabled:hover:bg-white",
              "dark:bg-white/10 dark:hover:bg-white/20 dark:disabled:hover:bg-white/10"
            )}
            onClick={() =>
              handlePageChange(table.getState().pagination.pageIndex - 1)
            }
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className="flex w-[100px] items-center justify-center font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            className={cn(
              "h-8 w-8 p-0 whitespace-nowrap bg-white hover:bg-gray-200 border disabled:hover:bg-white",
              "dark:bg-white/10 dark:hover:bg-white/20 dark:disabled:hover:bg-white/10"
            )}
            onClick={() =>
              handlePageChange(table.getState().pagination.pageIndex + 1)
            }
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            className={cn(
              "hidden h-8 w-8 p-0 lg:flex whitespace-nowrap bg-white hover:bg-gray-200 border disabled:hover:bg-white",
              "dark:bg-white/10 dark:hover:bg-white/20 dark:disabled:hover:bg-white/10"
            )}
            onClick={() => handlePageChange(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      ) : null}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="font-sans bg-white">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
