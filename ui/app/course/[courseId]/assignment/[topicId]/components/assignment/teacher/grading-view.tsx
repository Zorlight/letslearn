import { Button } from "@/lib/shadcn/button";
import GradingSummaryTable from "./grading-summary-table";
import { StudentResponse } from "@/models/student-response";
import { useTab } from "@/hooks/useTab";
import { Tab } from "../../static-data";
import { AssignmentTopic } from "@/models/topic";

interface Props {
  assignment: AssignmentTopic;
  assignmentResponses: StudentResponse[];
}
export default function GradingView({
  assignment,
  assignmentResponses,
}: Props) {
  const { handleTabSelected } = useTab<Tab>();
  const handleGradeClick = () => {
    handleTabSelected(Tab.SUBMISSIONS);
    localStorage.setItem(`assignment-${assignment.id}`, Tab.SUBMISSIONS);
  };
  return (
    <div className="space-y-4">
      <Button
        variant="cyan"
        className="w-fit rounded-lg"
        onClick={handleGradeClick}
      >
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
