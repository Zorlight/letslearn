"use client";
import { getGradeColor } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import Avatar from "@/components/ui/simple/avatar";
import { Input } from "@/lib/shadcn/input";
import { cn } from "@/lib/utils";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { User } from "@/models/user";

interface Props {
  selectedStudentResponse: StudentResponse | null;
  studentResponses: StudentResponse[];
  onResponseSelect?: (student: StudentResponse) => void;
}

export default function SubmissionTable({
  selectedStudentResponse,
  studentResponses,
  onResponseSelect,
}: Props) {
  const handleStudentSelect = (student: User) => () => {
    const selectedResponse = studentResponses.find(
      (response) => response.student.id === student.id
    );
    if (!selectedResponse) return;
    if (onResponseSelect) onResponseSelect(selectedResponse);
  };
  const totalMark = 100;
  return (
    <table className="border-1 border-gray-300 bg-white border-collapse">
      <tbody>
        {studentResponses.map((res, index) => {
          const { student } = res;
          const { mark } = res.data as AssignmentResponseData;
          return (
            <tr
              key={index}
              className={cn(
                "w-full flex flex-row whitespace-nowrap border-collapse cursor-pointer duration-200 ease-linear",
                selectedStudentResponse &&
                  selectedStudentResponse.student.id === student.id
                  ? "bg-cyan-50"
                  : "hover:bg-gray-100"
              )}
              onClick={handleStudentSelect(student)}
            >
              <td className="flex-1 p-0 m-0">
                <div className="flex flex-row gap-4 items-center py-3 px-4 border-1">
                  <Avatar />
                  <span className="text-cyan-500 font-bold">
                    {student.username}
                  </span>
                </div>
              </td>
              <td className="p-0 m-0">
                <div
                  className={cn(
                    "h-full py-3 px-4 flex items-center font-bold border-1 text-gray-500 text-sm",
                    mark && getGradeColor(mark, totalMark)
                  )}
                >
                  {mark && <span>{mark}</span>}
                  {!mark && (
                    <div className="flex flex-row items-center">
                      <Input
                        max={totalMark}
                        min={0}
                        step={1}
                        maxLength={totalMark.toString().length}
                        className="h-fit w-[40px] bg-transparent border-0 border-b-[0.5px] rounded-none py-0 px-1 text-center"
                      />
                    </div>
                  )}
                  <span>{`/${totalMark}`}</span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
