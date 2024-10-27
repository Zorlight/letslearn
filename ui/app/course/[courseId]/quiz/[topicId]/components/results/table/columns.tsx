"use client";
import { DataTableColumnHeader } from "@/components/table/my_table_column_header";
import {
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
import { cn, getDurationText } from "@/lib/utils";
import {
  getQuizResponseMark,
  getQuizResponseTotalMark,
  QuizResponseData,
  StudentResponse,
} from "@/models/student-response";
import { User } from "@/models/user";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pen, Trash2 } from "lucide-react";
import Image from "next/image";
import { getGradeColor } from "../../static-data";

const resultColumnTitles = {
  id: "ID",
  image: "Image",
  student: "Student name",
  email: "Email",
  status: "Status",
  duration: "Duration",
  grade: "Grade",
  startedAt: "Started at",
  completedAt: "Completed at",
};

const resultColumnVisibility = {
  id: false,
  image: true,
  student: true,
  email: true,
  status: true,
  duration: true,
  grade: true,
  startedAt: false,
  completedAt: false,
};

const imageColumn = (
  accessorKey: string,
  title: string
): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      const student: User = row.getValue(accessorKey);
      const imageUrl = student.image;

      return (
        <Image
          className="w-[50px] object-fill rounded-full px-2"
          src={imageUrl}
          alt="User avatar"
        />
      );
    },
    enableSorting: false,
  };
  return col;
};

const studentNameColumn = (
  accessorKey: string,
  title: string
): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      const student: User = row.getValue(accessorKey);
      const name = student.username;

      return <p className="px-2 w-[150px]">{name}</p>;
    },
    enableSorting: true,
  };
  return col;
};
const emailColumn = (
  accessorKey: string,
  title: string
): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      const student: User = row.getValue(accessorKey);
      const email = student.email;

      return <p className="px-2">{email}</p>;
    },
    enableSorting: true,
  };
  return col;
};

const statusColumn = (
  accessorKey: string,
  title: string
): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      const quizResponseData = row.getValue("data") as QuizResponseData;
      const status: string = quizResponseData.status;

      return <p className="px-2">{status}</p>;
    },
    enableSorting: true,
  };
  return col;
};
const durationColumn = (
  accessorKey: string,
  title: string
): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      const quizResponseData = row.getValue("data") as QuizResponseData;
      const startedAt: string = quizResponseData.startedAt;
      const completedAt: string = quizResponseData.completedAt;
      const duration = getDurationText(startedAt, completedAt);

      return <p className="px-2">{duration}</p>;
    },
    enableSorting: true,
  };
  return col;
};

const gradeColumn = (
  accessorKey: string,
  title: string
): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      const quizResponseData = row.getValue("data") as QuizResponseData;
      const grade = getQuizResponseMark(quizResponseData);
      const maxGrade = getQuizResponseTotalMark(quizResponseData);
      const color = getGradeColor(grade, maxGrade);

      return <p className={cn("px-2", color)}>{grade}</p>;
    },
    enableSorting: true,
  };
  return col;
};

interface ActionColumnProps {
  onEdit?: (questionId: string) => void;
  onDelete?: (questionId: string) => void;
}
const actionColumn = ({
  onEdit,
  onDelete,
}: ActionColumnProps): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
    id: "Action",
    cell: ({ row }) => {
      let id: string = row.getValue("id");
      const handleEdit = () => {
        if (onEdit) onEdit(id);
      };
      const handleDelete = () => {
        if (onDelete) onDelete(id);
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
            <DropdownMenuItem
              className="flex gap-1 text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer ease-linear duration-100"
              onClick={handleDelete}
            >
              <Trash2 size={14} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: true,
  };
  return col;
};

interface ResultTableProps {
  onEdit?: (questionId: string) => void;
  onDelete?: (questionId: string) => void;
}
const resultTableColumns = ({
  onEdit,
  onDelete,
}: ResultTableProps): ColumnDef<StudentResponse>[] => {
  const columns: ColumnDef<StudentResponse>[] = [
    defaultSelectColumn<StudentResponse>(),
    defaultIndexColumn<StudentResponse>(),
    imageColumn("student", resultColumnTitles.image),
    studentNameColumn("student", resultColumnTitles.student),
    emailColumn("student", resultColumnTitles.email),
    statusColumn("data", resultColumnTitles.status),
    durationColumn("data", resultColumnTitles.duration),
    gradeColumn("data", resultColumnTitles.grade),
    actionColumn({ onEdit, onDelete }),
  ];

  return columns;
};

export { resultColumnTitles, resultColumnVisibility, resultTableColumns };
