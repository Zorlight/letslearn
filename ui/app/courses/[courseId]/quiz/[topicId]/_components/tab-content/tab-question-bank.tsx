import { Button } from "@/lib/shadcn/button";
import { Question } from "@/models/question";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import CreateQuestionDialog from "../question-bank/dialog/create-question-dialog";
import QuestionTable from "../question-bank/table/question-table";
import { QuestionStatus, QuestionType, TabInTab } from "../static-data";
import { tabInTabMapper } from "./tab-in-tab/tap-in-tab-mapper";

interface Props {
  questions: Question[];
  onQuestionsChange?: (questions: Question[]) => void;
  onTabInTabChange: (tab: TabInTab) => void;
  onTabInTabQuestionChange?: (question: Question | undefined) => void;
}
const TabQuestionBank = ({
  questions,
  onQuestionsChange,
  onTabInTabChange,
  onTabInTabQuestionChange,
}: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddQuestion = (type: QuestionType) => {
    const tab = tabInTabMapper[type];
    onTabInTabChange(tab);
  };

  const handleEditQuestion = (id: string) => {
    const question = questions.find((q) => q.id === id);
    if (!question) {
      toast.error("Question not found");
      return;
    }

    const tab = tabInTabMapper[question.type];
    onTabInTabChange(tab);
    if (onTabInTabQuestionChange) onTabInTabQuestionChange(question);
  };

  const handleStatusChange = (id: string, status: string) => {
    const questionToChange = questions.find((q) => q.id === id);
    if (!questionToChange) {
      toast.error("Question not found");
      return;
    }
    questionToChange.status = status as QuestionStatus;
    const newQuestions = questions.map((q) =>
      q.id === id ? questionToChange : q
    );
    if (onQuestionsChange) onQuestionsChange(newQuestions);
  };

  const handleQuestionNameChange = (id: string, name: string) => {
    const questionToChange = questions.find((q) => q.id === id);
    if (!questionToChange) {
      toast.error("Question not found");
      return;
    }
    questionToChange.questionName = name;
    const newQuestions = questions.map((q) =>
      q.id === id ? questionToChange : q
    );
    if (onQuestionsChange) onQuestionsChange(newQuestions);
  };

  const buttons = [
    <CreateQuestionDialog
      key={0}
      open={openDialog}
      onOpenChange={setOpenDialog}
      onAddQuestion={handleAddQuestion}
    >
      <Button variant="default">
        <CirclePlus size={16} />
        Create a new question
      </Button>
    </CreateQuestionDialog>,
  ];

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="py-4 space-y-2">
        <h4 className="text-orange-600">Question bank</h4>
        <QuestionTable
          data={questions}
          buttons={buttons}
          otherFunctions={{
            onEdit: handleEditQuestion,
            onStatusChange: handleStatusChange,
            onQuestionNameChange: handleQuestionNameChange,
          }}
        />
      </div>
    </div>
  );
};

export default TabQuestionBank;
