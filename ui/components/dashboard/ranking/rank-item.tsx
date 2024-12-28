import { Separator } from "@/lib/shadcn/separator";
import { StudentWithMark } from "@/models/report";
import ColorItem from "../summary/color-item";
import StudentList from "../summary/student-list";
import RankLogo from "./rank-logo";

interface Props {
  rank: "S" | "A" | "B" | "C";
  studentWithMarks: StudentWithMark[];
  onClick?: (studentId: string) => void;
}
const markRank: Record<string, string> = {
  S: "80 - 100%",
  A: "50 - 79%",
  B: "20 - 49%",
  C: "0 - 19%",
};
const markRankColor: Record<string, string> = {
  S: "text-green-500 bg-green-100",
  A: "text-cyan-500 bg-cyan-100",
  B: "text-blue-500 bg-blue-100",
  C: "text-yellow-500 bg-yellow-100",
};
export default function RankItem({ rank, studentWithMarks, onClick }: Props) {
  return (
    <div className="flex flex-row items-center justify-between p-2 rounded-lg border-[0.5px] border-gray-300">
      <div className="flex flex-row items-center gap-2">
        <div className="min-w-[140px] flex flex-row items-center gap-2">
          <RankLogo rank={rank} />
          <ColorItem className={markRankColor[rank]}>
            {markRank[rank]}
          </ColorItem>
        </div>
        <Separator orientation="vertical" className="w-[1px] h-4" />
        <div className="flex flex-row items-center gap-2">
          <ColorItem className="text-gray-500 bg-gray-100">
            {studentWithMarks.length}
          </ColorItem>
          <span className="text-gray-500 font-bold text-sm">
            {studentWithMarks.length > 1 ? "Students" : "Student"}
          </span>
        </div>
      </div>
      <StudentList
        students={studentWithMarks.map((s) => s.student)}
        maxToShow={4}
        onClick={onClick}
      />
    </div>
  );
}
