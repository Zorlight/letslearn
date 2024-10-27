import { Button } from "@/lib/shadcn/button";
import { Question } from "@/models/question";
import { CirclePlus, Hand } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { QuestionStatus, QuestionType, TabInTab } from "../static-data";
import { tabInTabMapper } from "./tab-in-tab/tap-in-tab-mapper";
import CustomDialog from "@/components/ui/custom-dialog";
import CreateQuestionDialog from "../question-bank/dialog/create-question-dialog";
import QuestionTable from "../question-bank/table/question-table";
import { StudentResponse } from "@/models/student-response";
import ResultTable from "../results/table/result-table";

interface Props {
  studentResponses: StudentResponse[];
  onQuestionsChange?: (questions: Question[]) => void;
  onTabInTabChange?: (tab: TabInTab) => void;
  onTabInTabQuestionChange?: (question: Question | undefined) => void;
}
const TabResults = ({
  studentResponses,
  onQuestionsChange,
  onTabInTabChange,
  onTabInTabQuestionChange,
}: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState<{
    title: string;
    content: string;
    variant: string;
  }>({
    title: "Delete question",
    content:
      "Once you delete this quesstion, you won’t be able to undo your action. Are you sure you want to delete this question?",
    variant: "warning",
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const handleAddQuestion = (type: QuestionType) => {
    const tab = tabInTabMapper[type];
    if (onTabInTabChange) onTabInTabChange(tab);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="space-y-2">
        <h4 className="text-orange-500">Results</h4>
        <ResultTable data={studentResponses} otherFunctions={{}} />
      </div>
    </div>
  );
};

export default TabResults;
