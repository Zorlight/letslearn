"use client";
import { CustomDatatable } from "@/components/table/custom_datatable";
import { getFilterAllTableData } from "@/components/table/utils";
import { handleFilterColumn } from "@/lib/utils";
import { Question } from "@/models/question";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  questionColumnTitles,
  questionColumnVisibility,
  questionTableColumns,
} from "./columns";

interface OtherFunctions {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDeleteMany?: (questions: Question[]) => Promise<any>;
  onStatusChange?: (id: string, status: string) => void;
  onQuestionNameChange?: (id: string, name: string) => void;
}

interface Props {
  data: Question[];
  pagination?: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  error?: string;
  buttons?: ReactNode[];
  otherFunctions: OtherFunctions;
}
const QuestionTable = ({
  data,
  error,
  pagination,
  buttons,
  otherFunctions,
}: Props) => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<Question[]>([]);
  const filterOptionKeys = Object.keys(questionColumnTitles).map((key) => key);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  //   const handlePublishFilter = (filterInput: string, data: Question[]) => {
  //     const filteredData = data.filter((course) => {
  //       const isPublished = course.isPublished ? "Published" : "Draft";
  //       return isPublished.toLowerCase().startsWith(filterInput.toLowerCase());
  //     });
  //     return filteredData;
  //   };

  const handleFilterChange = (filterInput: string, col: string) => {
    let filteredData: Question[] = [];
    if (col === "")
      filteredData = getFilterAllTableData(
        filterInput,
        questionColumnTitles,
        getDataFilter
      );
    else filteredData = getDataFilter(filterInput, col);
    setFilteredData(filteredData);
  };

  const getDataFilter = (filterInput: string, col: string) => {
    //special col that cannot filter as default here

    //
    return handleFilterColumn(filterInput, col, data);
  };

  return (
    <>
      <CustomDatatable<Question>
        data={filteredData}
        pagination={pagination}
        columns={questionTableColumns({
          onEdit: otherFunctions?.onEdit,
          onDelete: otherFunctions?.onDelete,
          onStatusChange: otherFunctions?.onStatusChange,
          onQuestionNameChange: otherFunctions?.onQuestionNameChange,
        })}
        columnTitles={questionColumnTitles}
        buttons={buttons}
        config={{
          defaultVisibilityState: questionColumnVisibility,
          showFilterButton: true,
          filterOptionKeys: filterOptionKeys,
          showDataTableViewOptions: true,
          showRowSelectedCounter: true,
          onFilterChange: handleFilterChange,
          onDeleteRowsBtnClick: otherFunctions?.onDeleteMany,
        }}
      />
    </>
  );
};

export default QuestionTable;
