"use client";
import { CustomDatatable } from "@/components/table/custom_datatable";
import { getFilterAllTableData } from "@/components/table/utils";
import { getDurationText, handleFilterColumn } from "@/lib/utils";
import {
  getQuizResponseMark,
  QuizResponseData,
  StudentResponse,
} from "@/models/student-response";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  resultColumnTitles,
  resultColumnVisibility,
  resultTableColumns,
} from "./columns";
import { Role } from "@/models/user";

interface OtherFunctions {
  onView?: (responseId: string) => void;
}

interface Props {
  data: StudentResponse[];
  pagination?: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  error?: string;
  buttons?: ReactNode[];
  otherFunctions: OtherFunctions;
}
const ResultTable = ({
  data,
  error,
  pagination,
  buttons,
  otherFunctions,
}: Props) => {
  const [filteredData, setFilteredData] = useState<StudentResponse[]>([]);
  const filterOptionKeys = Object.keys(resultColumnTitles).map((key) => key);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    const removeTeacherResponses = data.filter(
      (response) => response.student.role !== Role.TEACHER
    );
    setFilteredData(removeTeacherResponses);
  }, [data]);

  const handleFilterChange = (filterInput: string, col: string) => {
    let filteredData: StudentResponse[] = [];
    if (col === "")
      filteredData = getFilterAllTableData(
        filterInput,
        resultColumnTitles,
        getDataFilter
      );
    else filteredData = getDataFilter(filterInput, col);
    setFilteredData(filteredData);
  };

  const getDataFilter = (filterInput: string, col: string) => {
    //special col that cannot filter as default here
    if (col == "name") return handleNameFilter(filterInput, data);
    else if (col == "email") handleEmailFilter(filterInput, data);
    else if (col == "status") handleStatusFilter(filterInput, data);
    else if (col == "duration") handleDurationFilter(filterInput, data);
    else if (col == "grade") handleGradeFilter(filterInput, data);
    else if (col == "startedAt") handleStartedAtFilter(filterInput, data);
    else if (col == "completedAt") handleCompletedAtFilter(filterInput, data);

    //
    return handleFilterColumn(filterInput, col, data);
  };

  const handleNameFilter = (
    filterInput: string,
    responses: StudentResponse[]
  ) => {
    const filteredData = responses.filter((res) => {
      const { username } = res.student;
      return username.toLowerCase().startsWith(filterInput.toLowerCase());
    });
    return filteredData;
  };
  const handleEmailFilter = (
    filterInput: string,
    responses: StudentResponse[]
  ) => {
    const filteredData = responses.filter((res) => {
      const { email } = res.student;
      return email.toLowerCase().startsWith(filterInput.toLowerCase());
    });
    return filteredData;
  };
  const handleStatusFilter = (
    filterInput: string,
    responses: StudentResponse[]
  ) => {
    const filteredData = responses.filter((res) => {
      const { status } = res.data as QuizResponseData;
      return status.toLowerCase().startsWith(filterInput.toLowerCase());
    });
    return filteredData;
  };
  const handleDurationFilter = (
    filterInput: string,
    responses: StudentResponse[]
  ) => {
    const filteredData = responses.filter((res) => {
      const { startedAt, completedAt } = res.data as QuizResponseData;
      const duration = getDurationText(
        new Date(startedAt),
        new Date(completedAt)
      );
      return duration.toLowerCase().startsWith(filterInput.toLowerCase());
    });
    return filteredData;
  };
  const handleGradeFilter = (
    filterInput: string,
    responses: StudentResponse[]
  ) => {
    const filteredData = responses.filter((res) => {
      const mark = getQuizResponseMark(res.data as QuizResponseData);
      return mark.toString().startsWith(filterInput);
    });
    return filteredData;
  };
  const handleStartedAtFilter = (
    filterInput: string,
    responses: StudentResponse[]
  ) => {
    const filteredData = responses.filter((res) => {
      const { startedAt } = res.data as QuizResponseData;
      return startedAt.toLowerCase().startsWith(filterInput.toLowerCase());
    });
    return filteredData;
  };
  const handleCompletedAtFilter = (
    filterInput: string,
    responses: StudentResponse[]
  ) => {
    const filteredData = responses.filter((res) => {
      const { completedAt } = res.data as QuizResponseData;
      return completedAt.toLowerCase().startsWith(filterInput.toLowerCase());
    });
    return filteredData;
  };

  return (
    <>
      <CustomDatatable<any>
        data={filteredData}
        pagination={pagination}
        columns={resultTableColumns({
          onView: otherFunctions?.onView,
        })}
        columnTitles={resultColumnTitles}
        buttons={buttons}
        config={{
          defaultVisibilityState: resultColumnVisibility,
          showFilterButton: true,
          filterOptionKeys: filterOptionKeys,
          showDataTableViewOptions: true,
          showRowSelectedCounter: true,
          onFilterChange: handleFilterChange,
        }}
      />
    </>
  );
};

export default ResultTable;
