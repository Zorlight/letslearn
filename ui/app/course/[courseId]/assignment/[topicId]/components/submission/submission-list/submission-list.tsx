"use client";
import { useDebounceFunction } from "@/hooks/useDebounce";
import { StudentResponse } from "@/models/student-response";
import { User } from "@/models/user";
import SubmissionItem from "./submission-item";

interface Props {
  selectedStudentResponse: StudentResponse | null;
  studentResponses: StudentResponse[];
  onResponseSelect?: (student: StudentResponse) => void;
  onSelectedStudentResponseChange?: (student: StudentResponse) => void;
  onEnter?: () => void;
}

export default function SubmissionList({
  selectedStudentResponse,
  studentResponses,
  onResponseSelect,
  onSelectedStudentResponseChange,
  onEnter,
}: Props) {
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

  return (
    <table className="w-full border-1 border-gray-300 bg-white border-collapse">
      <tbody>
        {studentResponses.map((res) => (
          <SubmissionItem
            key={res.id}
            assignmentResponse={res}
            selected={selectedStudentResponse?.id === res.id}
            onClick={handleStudentSelect(res.student)}
            onInputChange={handleMarkChange}
            onEnter={onEnter}
          />
        ))}
      </tbody>
    </table>
  );
}
