import { DataTableColumnHeader } from "@/components/table/my_table_column_header";
import {
  defaultColumn,
  defaultIndexColumn,
} from "@/components/table/my_table_default_column";
import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { Course } from "@/models/course";
import { ColumnDef } from "@tanstack/react-table";

export const courseColumnTitles = {
  title: "Title",
  price: "Price",
  isPublished: "Published",
};

export const courseColumnVisibility = {
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

export const courseTableColumns = (): ColumnDef<Course>[] => {
  const columns: ColumnDef<Course>[] = [defaultIndexColumn<Course>()];

  for (let key in courseColumnTitles) {
    let col: ColumnDef<Course>;
    if (key === "isPublished")
      col = publishColumn(key, courseColumnTitles[key]);
    else col = defaultColumn<Course>(key, courseColumnTitles);
    columns.push(col);
  }

  return columns;
};
