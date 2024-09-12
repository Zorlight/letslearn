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

interface Props {
  data: Question[];
  pagination?: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  error?: string;
  buttons?: ReactNode[];
}
const QuestionTable = ({ data, error, pagination, buttons }: Props) => {
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

  const handleDeleteRowButtonClick = async (data: Question[]): Promise<any> => {
    return await Promise.resolve();
  };

  return (
    <>
      <CustomDatatable<Question>
        data={filteredData}
        pagination={pagination}
        columns={questionTableColumns()}
        columnTitles={questionColumnTitles}
        buttons={buttons}
        config={{
          defaultVisibilityState: questionColumnVisibility,
          showFilterButton: true,
          filterOptionKeys: filterOptionKeys,
          showDataTableViewOptions: true,
          showRowSelectedCounter: true,
          onFilterChange: handleFilterChange,
          onDeleteRowsBtnClick: handleDeleteRowButtonClick,
        }}
      />
    </>
  );
};

export default QuestionTable;
