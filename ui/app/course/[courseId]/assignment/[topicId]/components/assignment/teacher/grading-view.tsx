import { Button } from "@/lib/shadcn/button";
import GradingSummaryTable from "./grading-summary-table";
import { StudentResponse } from "@/models/student-response";

interface Props {
  assignmentResponses: StudentResponse[];
}
export default function GradingView({ assignmentResponses }: Props) {
  return (
    <div className="space-y-4">
      <Button variant="cyan" className="w-fit rounded-lg">
        Grade
      </Button>

      <div className="font-bold text-orange-500">Grading summary</div>
      <GradingSummaryTable
        hiddenFromStudent={0}
        assigned={40}
        submitted={36}
        needGrading={0}
      />
    </div>
  );
}
