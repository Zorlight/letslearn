import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/shadcn/dropdown-menu";
import { Column } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon, Ban, EyeOff } from "lucide-react";
import { CollumnHeaderButton } from "./collumn-header-button";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <div
      className={cn(
        "font-nunito w-min flex items-center space-x-2 text-gray-800 justify-stretch",
        className
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CollumnHeaderButton
            canSort={column.getCanSort()}
            className="data-[state=open]:bg-accent"
          >
            {title}

            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <div className="w-4 h-4"></div>
            )}
            {/* This is a trick to make the button balance */}
          </CollumnHeaderButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className={cn(
            "font-sans bg-white text-gray-500",
            column.getCanSort() ? "" : "hidden"
          )}
        >
          <DropdownMenuItem
            className="flex items-center cursor-pointer hover:bg-gray-100 ease-linear duration-100"
            onClick={() => column.toggleSorting(false)}
          >
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-gray-500" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center cursor-pointer hover:bg-gray-100 ease-linear duration-100"
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-gray-500" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center cursor-pointer hover:bg-gray-100 ease-linear duration-100"
            onClick={() => column.clearSorting()}
          >
            <Ban className="mr-2 h-3.5 w-3.5 text-gray-500" />
            No sorting
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center cursor-pointer hover:bg-gray-100 ease-linear duration-100"
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOff className="mr-2 h-3.5 w-3.5 text-gray-500" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { DataTableColumnHeader };
