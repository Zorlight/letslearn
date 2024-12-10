import { Button } from "@/lib/shadcn/button";
import GradingSummaryTable from "./grading-summary-table";

export default function GradingView() {
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
