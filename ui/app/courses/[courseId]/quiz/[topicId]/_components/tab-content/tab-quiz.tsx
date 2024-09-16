import { Button } from "@/lib/shadcn/button";
import { Separator } from "@/lib/shadcn/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { SearchCheck } from "lucide-react";
import React from "react";
import { GradingMethod, TabInTab } from "../static-data";

interface Props {
  onTabInTabChange: (tab: TabInTab) => void;
}
const TabQuiz = ({ onTabInTabChange }: Props) => {
  const handlePreviewQuiz = () => {
    onTabInTabChange(TabInTab.QUIZ_TAB);
  };

  const attemptsAllowed = 3;
  const gradingMethod = GradingMethod.HIGHEST_GRADE;
  return (
    <div className="space-y-2">
      <div className="bg-slate-50 rounded-md p-6 space-y-2">
        <h5 className="font-medium">Quiz - 20/2/2022!</h5>
        <Separator />
        <p className="text-sm text-slate-600">
          This quiz contains a variety of questions to test your knowledge of
          Alpine mountaineering. At the end of the quiz you will be given your
          score with suggestions for improvement.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="default" className="w-fit" onClick={handlePreviewQuiz}>
          <SearchCheck size={16} />
          Preview quiz
        </Button>
        <p className="text-sm text-slate-600">
          {`Attempts allowed: ${attemptsAllowed}`}
        </p>
        <p className="text-sm text-slate-600">
          {`Grading method: ${gradingMethod}`}
        </p>
      </div>
    </div>
  );
};

export default TabQuiz;
