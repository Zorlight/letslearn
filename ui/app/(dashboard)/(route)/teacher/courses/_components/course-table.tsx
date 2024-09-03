"use client";
import { useEffect, useState } from "react";
import {
  courseColumnTitles,
  courseColumnVisibility,
  courseTableColumns,
} from "./columns";
import { Course } from "@/models/course";
import { toast } from "react-toastify";
import { handleFilterColumn } from "@/lib/utils";
import { CustomDatatable } from "@/components/table/custom_datatable";
import { Button } from "@/lib/shadcn/button";
import { useRouter } from "next/navigation";
import { CirclePlus } from "lucide-react";

interface Props {
  courses: Course[];
  pagination?: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  error?: string;
}
const CourseTable = ({ courses, error, pagination }: Props) => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<Course[]>([]);
  const filterOptionKeys = Object.keys(courseColumnTitles).map((key) => key);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    setFilteredData(courses);
  }, [courses]);

  const handlePublishFilter = (filterInput: string, data: Course[]) => {
    const filteredData = data.filter((course) => {
      const isPublished = course.isPublished ? "Published" : "Draft";
      return isPublished.toLowerCase().startsWith(filterInput.toLowerCase());
    });
    return filteredData;
  };

  const handleFilterChange = (filterInput: string, col: string) => {
    let filteredData: Course[] = [];
    if (col === "") filteredData = getFilterAllTableData(filterInput);
    else filteredData = getDataFilter(filterInput, col);
    setFilteredData(filteredData);
  };

  const getDataFilter = (filterInput: string, col: string) => {
    //special col that cannot filter as default here
    if (col === "isPublished") return handlePublishFilter(filterInput, courses);

    //

    return handleFilterColumn(filterInput, col, courses);
  };
  const getFilterAllTableData = (filterInput: string) => {
    let filteredAllTableData: Set<Course> = new Set();
    Object.keys(courseColumnTitles).forEach((col) => {
      const filteredData = getDataFilter(filterInput, col);
      filteredData.forEach((course) => filteredAllTableData.add(course));
    });
    const filteredData = Array.from(filteredAllTableData);
    return filteredData;
  };

  return (
    <>
      <CustomDatatable
        data={filteredData}
        pagination={pagination}
        columns={courseTableColumns()}
        columnTitles={courseColumnTitles}
        buttons={[
          <Button
            key={1}
            variant="default"
            onClick={() => router.push("/teacher/courses/create")}
            className="flex items-center gap-2"
          >
            <CirclePlus size={16} />
            New Course
          </Button>,
        ]}
        config={{
          defaultVisibilityState: courseColumnVisibility,
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

export default CourseTable;
