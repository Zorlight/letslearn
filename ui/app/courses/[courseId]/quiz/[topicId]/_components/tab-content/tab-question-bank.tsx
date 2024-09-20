import { ResponsesData } from "@/app/courses/[courseId]/choice/[topicId]/_components/tab-content/tab-responses";
import { fakeResponses } from "@/fake-data/student-response";
import { Button } from "@/lib/shadcn/button";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import CreateQuestionDialog from "../question-bank/create-question-dialog";
import QuestionTable from "../question-bank/table/question-table";
import { QuestionType, TabInTab } from "../static-data";
import { tabInTabMapper } from "./tab-in-tab/tap-in-tab-mapper";
import { fakeQuestions } from "@/fake-data/question";
import { toast } from "react-toastify";
import { Question } from "@/models/question";

interface Props {
  questions: Question[];
  onTabInTabChange: (tab: TabInTab) => void;
  onTabInTabQuestionChange?: (question: Question | undefined) => void;
}
const TabQuestionBank = ({
  questions,
  onTabInTabChange,
  onTabInTabQuestionChange,
}: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [responses, setResponses] = useState<ResponsesData[]>(fakeResponses);

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
          }}
        />
      </div>
    </div>
  );
};

export default TabQuestionBank;
