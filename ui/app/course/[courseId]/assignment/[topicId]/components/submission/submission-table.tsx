import { getGradeColor } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import Avatar from "@/components/ui/simple/avatar";
import { cn } from "@/lib/utils";
import { StudentResponse } from "@/models/student-response";
import { User } from "@/models/user";

interface Props {
  selectedStudentResponse: StudentResponse | null;
  studentResponses: StudentResponse[];
  students: User[];
  onResponseSelect?: (student: StudentResponse) => void;
}
export default function SubmissionTable({
  selectedStudentResponse,
  studentResponses,
  students,
  onResponseSelect,
}: Props) {
  const handleStudentSelect = (student: User) => () => {
    const selectedResponse = studentResponses.find(
      (response) => response.student.id === student.id
    );
    if (!selectedResponse) return;
    if (onResponseSelect) onResponseSelect(selectedResponse);
  };
  return (
    <table className="border-1 border-gray-300 bg-white border-collapse">
      <tbody>
        {students.map((student, index) => {
          const mark = 90 - index * 10;
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
                    "h-full py-3 px-4 flex items-center font-bold border-1",
                    getGradeColor(mark, 100)
                  )}
                >{`${mark}/100`}</div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
