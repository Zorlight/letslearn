import { DataTableColumnHeader } from "@/components/table/my_table_column_header";
import {
  defaultColumn,
  defaultIndexColumn,
  defaultSelectColumn,
} from "@/components/table/my_table_default_column";
import { Button } from "@/lib/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/shadcn/dropdown-menu";
import { cn } from "@/lib/utils";
import { Course } from "@/models/course";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pen } from "lucide-react";
import { useRouter } from "next/navigation";

export const courseColumnTitles = {
  id: "ID",
  title: "Title",
  price: "Price",
  isPublished: "Published",
};

export const courseColumnVisibility = {
  id: false,
  title: true,
  price: true,
  isPublished: true,
};

const publishColumn = (
  accessorKey: string,
  title: string
): ColumnDef<Course> => {
  const col: ColumnDef<Course> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      let isPublished: boolean = row.getValue(accessorKey);

      return (
        <Button
          variant="default"
          size="sm"
          className={cn(
            "bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full px-4 py-1 h-fit",
            isPublished && "bg-indigo-950 hover:bg-indigo-900 text-white"
          )}
        >
          {isPublished ? "Published" : "Draft"}
        </Button>
      );
    },
    enableSorting: true,
  };
  return col;
};

interface actionColumnProps {
  onEdit?: (id: string) => void;
}
const actionColumn = ({ onEdit }: actionColumnProps): ColumnDef<Course> => {
  const col: ColumnDef<Course> = {
    id: "Action",
    cell: ({ row }) => {
      let id: string = row.getValue("id");
      const handleEdit = () => {
        if (onEdit) onEdit(id);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-6 h-6 p-0 bg-transparent hover:bg-gray-200 dark:hover:bg-white/10 hover:opacity-100 text-black">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white font-sans z-50">
            <DropdownMenuItem
              className="flex gap-1 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer ease-linear duration-100"
              onClick={handleEdit}
            >
              <Pen size={14} />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: true,
  };
  return col;
};

interface CourseTableColumnProps {
  onEdit?: (id: string) => void;
}
export const courseTableColumns = ({
  onEdit,
}: CourseTableColumnProps): ColumnDef<Course>[] => {
  const columns: ColumnDef<Course>[] = [
    defaultSelectColumn<Course>(),
    defaultIndexColumn<Course>(),
  ];

  for (let key in courseColumnTitles) {
    let col: ColumnDef<Course>;
    if (key === "isPublished")
      col = publishColumn(key, courseColumnTitles[key]);
    else col = defaultColumn<Course>(key, courseColumnTitles);
    columns.push(col);
  }
  columns.push(actionColumn({ onEdit }));

  return columns;
};
