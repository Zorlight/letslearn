"use client";
import IconButton from "@/components/buttons/icon-button";
import { useDebouce } from "@/hooks/useDebounce";
import { Input } from "@/lib/shadcn/input";
import { cn } from "@/lib/utils";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { AssignmentTopic } from "@/models/topic";
import {
  getAllAssignmentResponsesOfTopic,
  updateAssignmentResponse,
} from "@/services/assignment-response";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { submisisonFilterKeys } from "../static-data";
import FilterButton from "../submission/filter-button";
import SubmissionList from "../submission/submission-list/submission-list";
import SubmissionDefaultView from "../submission/submission-view/default-view";
import SubmissionSubmittedView from "../submission/submission-view/submitted-view";

interface Props {
  assignment: AssignmentTopic;
  className?: string;
}
export function TabSubmission({ className, assignment }: Props) {
  const [filterInput, setFilterInput] = useState<string>("");
  const debounceInputValue = useDebouce(filterInput);
  const [filterKey, setFilterKey] = useState<string>("");
  const [assignmentResponses, setAssignmentResponses] = useState<
    StudentResponse[]
  >([]);
  const [filteredResponses, setFilteredResponses] = useState<StudentResponse[]>(
    []
  );
  const [selectedStudentResponse, setSelectedStudentResponse] =
    useState<StudentResponse | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
  };
  const handleResponseSelect = (studentResponse: StudentResponse) => {
    setSelectedStudentResponse(studentResponse);
  };

  const handleCloseSubmittedView = () => {
    setSelectedStudentResponse(null);
  };
  const handleGetAssignmentResponsesSuccess = (
    responses: StudentResponse[]
  ) => {
    setAssignmentResponses(responses);
  };
  const handleGetAssignmentResponsesFail = (err: any) => {
    toast.error(err);
  };

  const handleFilterKeyChange = (key: string) => {
    setFilterKey(key);
  };

  const handleFilter = (value: string, key: string) => {
    console.log("filtering: ", value, key);
    if (value === "") {
      setFilteredResponses(assignmentResponses);
      return;
    }
    let filteredResponses: StudentResponse[] = [];
    if (key === "")
      filteredResponses = handleFilterAll(value, assignmentResponses);
    else if (key == "name")
      filteredResponses = handleFilterName(value, assignmentResponses);
    else if (key === "grade")
      filteredResponses = handleFilterGrade(value, assignmentResponses);

    setFilteredResponses(filteredResponses);
  };

  const handleFilterName = (name: string, responses: StudentResponse[]) => {
    return responses.filter((response) =>
      response.student.username.includes(name)
    );
  };

  const handleFilterGrade = (grade: string, responses: StudentResponse[]) => {
    return responses.filter((response) => {
      const data = response.data as AssignmentResponseData;
      if (!data.mark) return false;
      return data.mark.toString().includes(grade);
    });
  };

  const handleFilterAll = (value: string, responses: StudentResponse[]) => {
    const filteredByName = handleFilterName(value, responses);
    const filteredByGrade = handleFilterGrade(value, responses);
    return [...filteredByName, ...filteredByGrade];
  };
  const handleUpdateResponseSuccess = (data: StudentResponse) => {
    const updatedResponses = assignmentResponses.map((response) =>
      response.id === data.id ? data : response
    );
    setAssignmentResponses(updatedResponses);
    setSelectedStudentResponse(data);
    toast.success("Response updated");
  };
  const handleUpdateResponseFail = (err: any) => {
    toast.error(err);
  };

  const handleUpdateResponse = () => {
    if (!selectedStudentResponse) return;
    updateAssignmentResponse(
      assignment.id,
      selectedStudentResponse,
      handleUpdateResponseSuccess,
      handleUpdateResponseFail
    );
  };

  useEffect(() => {
    getAllAssignmentResponsesOfTopic(
      assignment.id,
      handleGetAssignmentResponsesSuccess,
      handleGetAssignmentResponsesFail
    );
  }, [assignment.id]);

  useEffect(() => {
    if (debounceInputValue == null || debounceInputValue == undefined) return;
    handleFilter(debounceInputValue, filterKey);
  }, [debounceInputValue, assignmentResponses]);

  const canGrade = true;
  return (
    <div className={cn(className)}>
      <h4 className="font-bold text-orange-500">Submissions</h4>
      <div className="relative w-full h-full flex flex-row">
        {selectedStudentResponse !== null && (
          <IconButton
            className="absolute top-0 right-0 group hover:bg-red-50"
            onClick={handleCloseSubmittedView}
          >
            <X className="text-gray-500 group-hover:text-red-500 duration-100 ease-linear" />
          </IconButton>
        )}
        <div className="flex flex-col gap-4 p-6 pl-0 border-r-1 border-gray-400">
          <div className="flex flex-row items-center gap-2">
            <Input
              placeholder={
                filterKey === ""
                  ? "Search anything..."
                  : `Search ${filterKey}...`
              }
              onChange={handleInputChange}
              className="max-w-sm shrink-0 md:w-[300px] max-md:w-auto py-2"
            />
            <FilterButton
              selectedKey={filterKey}
              data={submisisonFilterKeys}
              handleSelectChange={handleFilterKeyChange}
            />
          </div>
          <div className="w-full h-[350px] default-scrollbar">
            <SubmissionList
              selectedStudentResponse={selectedStudentResponse}
              studentResponses={filteredResponses}
              onResponseSelect={handleResponseSelect}
              onSelectedStudentResponseChange={setSelectedStudentResponse}
              onEnter={handleUpdateResponse}
              canGrade={canGrade}
            />
          </div>
        </div>
        {selectedStudentResponse === null && (
          <SubmissionDefaultView
            assignment={assignment}
            studentResponses={assignmentResponses}
            className="w-full flex flex-col gap-4 p-6"
          />
        )}
        {selectedStudentResponse !== null && (
          <SubmissionSubmittedView
            assignment={assignment}
            studentResponse={selectedStudentResponse}
            onStudentResponseChange={setSelectedStudentResponse}
            className="w-full flex flex-col gap-4 p-6"
          />
        )}
      </div>
    </div>
  );
}
