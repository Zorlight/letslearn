"use client";
import { DataTableColumnHeader } from "@/components/table/my_table_column_header";
import {
  defaultColumn,
  defaultIndexColumn,
  defaultSelectColumn,
} from "@/components/table/my_table_default_column";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/shadcn/dropdown-menu";
import { Question } from "@/models/question";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, MoreHorizontal, Pen } from "lucide-react";
import { questionIconMap, QuestionStatus } from "../../static-data";
import QuestionNameColumn from "./question-name-column";

const questionColumnTitles = {
  id: "ID",
  type: "Type",
  questionName: "Question name",
  status: "Status",
  createdAt: "Created at",
  usage: "Usage",
  createdBy: "Created by",
  modifiedBy: "Modified by",
  modifiedAt: "Modified at",
};

const questionColumnVisibility = {
  id: false,
  type: true,
  questionName: true,
  status: true,
  createdAt: false,
  createdBy: false,
  modifiedBy: true,
  modifiedAt: true,
  usage: true,
};

const questionTypeColumn = (
  accessorKey: string,
  title: string
): ColumnDef<Question> => {
  const col: ColumnDef<Question> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      let questionType: string = row.getValue(accessorKey);

      return (
        <div className="px-2">
          {questionIconMap[questionType as keyof typeof questionIconMap]}
        </div>
      );
    },
    enableSorting: true,
  };
  return col;
};

const questionNameColumn = (
  accessorKey: string,
  title: string,
  onQuestionNameChange?: (questionId: string, questionName: string) => void
): ColumnDef<Question> => {
  const col: ColumnDef<Question> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      let questionName: string = row.getValue(accessorKey);

      const handleQuestionNameChange = (questionName: string) => {
        if (onQuestionNameChange) {
          onQuestionNameChange(row.getValue("id"), questionName);
        }
      };
      return (
        <QuestionNameColumn
          questionName={questionName}
          onChange={handleQuestionNameChange}
        />
      );
    },
    enableSorting: true,
  };
  return col;
};

const questionStatusColumn = (
  accessorKey: string,
  title: string
): ColumnDef<Question> => {
  const col: ColumnDef<Question> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      let questionStatus: string = row.getValue(accessorKey);

      const handleComboboxChange = (value: string) => {
        console.log("handleComboboxChange", value);
      };

      const questionStatusOptions = Object.values(QuestionStatus);
      return (
        <Combobox
          showSearch={false}
          initialValue={questionStatus}
          options={questionStatusOptions}
          onChange={handleComboboxChange}
          className="w-40 px-2"
          popoverClassName="w-40"
        >
          <Button variant="outline" className="w-full justify-between">
            {questionStatus}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
      );
    },
    enableSorting: true,
  };
  return col;
};

interface ActionColumnProps {
  onEdit?: (questionId: string) => void;
}
const actionColumn = ({ onEdit }: ActionColumnProps): ColumnDef<Question> => {
  const col: ColumnDef<Question> = {
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
          <DropdownMenuContent
            align="end"
            className="bg-white text-primary-word dark:bg-dark-secondary-bg dark:text-dark-primary-word font-sans z-50"
          >
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

interface QuestionTableProps {
  onEdit?: (questionId: string) => void;
}
const questionTableColumns = ({
  onEdit,
}: QuestionTableProps): ColumnDef<Question>[] => {
  const columns: ColumnDef<Question>[] = [
    defaultSelectColumn<Question>(),
    defaultIndexColumn<Question>(),
  ];

  for (let key in questionColumnTitles) {
    let col: ColumnDef<Question>;
    if (key === "type")
      col = questionTypeColumn(key, questionColumnTitles[key]);
    else if (key === "questionName")
      col = questionNameColumn(key, questionColumnTitles[key]);
    else if (key === "status")
      col = questionStatusColumn(key, questionColumnTitles[key]);
    else col = defaultColumn<Question>(key, questionColumnTitles);
    columns.push(col);
  }
  columns.push(actionColumn({ onEdit }));

  return columns;
};

export { questionColumnTitles, questionColumnVisibility, questionTableColumns };
