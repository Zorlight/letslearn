"use client";
import { useDebounceFunction } from "@/hooks/useDebounce";
import { StudentResponse } from "@/models/student-response";
import { User } from "@/models/user";
import SubmissionItem from "./submission-item";
import { AssignmentTopic } from "@/models/topic";
import { toast } from "react-toastify";

interface Props {
  assignment: AssignmentTopic;
  selectedStudentResponse: StudentResponse | null;
  studentResponses: StudentResponse[];
  canGrade?: boolean;
  onResponseSelect?: (student: StudentResponse) => void;
  onSelectedStudentResponseChange?: (student: StudentResponse) => void;
  onEnter?: () => void;
}

export default function SubmissionList({
  assignment,
  selectedStudentResponse,
  studentResponses,
  canGrade = true,
  onResponseSelect,
  onSelectedStudentResponseChange,
  onEnter,
}: Props) {
  const isCloseAssignment = (assignment: AssignmentTopic) => {
    const { close } = assignment.data;
    return close ? new Date(close) < new Date() : false;
  };
  const handleStudentSelect = (student: User) => () => {
    const selectedResponse = studentResponses.find(
      (response) => response.student.id === student.id
    );
    if (!selectedResponse) return;
    if (onResponseSelect) onResponseSelect(selectedResponse);
  };
  const handleMarkChange = useDebounceFunction((mark: number) => {
    if (!selectedStudentResponse) return;
    const updatedResponse: StudentResponse = {
      ...selectedStudentResponse,
      data: {
        ...selectedStudentResponse.data,
        mark,
      },
    };
    if (onSelectedStudentResponseChange)
      onSelectedStudentResponseChange(updatedResponse);
  });

  const compareSubmission = (a: StudentResponse, b: StudentResponse) => {
    const nameA = a.student.username.toLowerCase();
    const nameB = b.student.username.toLowerCase();
    if (nameA < nameB) return -1;

    return 1;
  };

  return (
    <table className="w-full border-1 border-gray-300 bg-white border-collapse">
      <tbody>
        {studentResponses
          .sort((a, b) => compareSubmission(a, b))
          .map((res) => (
            <SubmissionItem
              key={res.id}
              isClose={isCloseAssignment(assignment)}
              assignmentResponse={res}
              selected={selectedStudentResponse?.id === res.id}
              onClick={handleStudentSelect(res.student)}
              onInputChange={handleMarkChange}
              onEnter={onEnter}
              canGrade={canGrade}
            />
          ))}
      </tbody>
    </table>
  );
}
