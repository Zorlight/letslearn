import Cell from "@/app/courses/[courseId]/_components/simple-table/table-cell";
import TableRow from "@/app/courses/[courseId]/_components/simple-table/table-row";
import { fakeResponses } from "@/app/courses/[courseId]/assignment/[topicId]/_components/fake-data";
import { ResponsesData } from "@/app/courses/[courseId]/choice/[topicId]/_components/tab-content/tab-responses";
import UserButton from "@/components/buttons/user-button";
import { useState } from "react";
import CreateQuestionDialog from "../question-bank/create-question-dialog";
import { QuestionType, TabInTab } from "../static-data";
import { toast } from "react-toastify";
import QuestionTable from "../question-bank/question-table";
import { questionBank } from "../fake-data";

interface Props {
  onTabInTabChange: (tab: TabInTab) => void;
}
const TabQuestionBank = ({ onTabInTabChange }: Props) => {
  const [responses, setResponses] = useState<ResponsesData[]>(fakeResponses);

  const handleAddQuestion = (type: QuestionType) => {
    let tab;
    switch (type) {
      case QuestionType.MULTIPLE_CHOICE:
        tab = TabInTab.MULTIPLE_CHOICE_QUESTION_TAB;
        break;
      case QuestionType.SHORT_ANSWER:
        tab = TabInTab.SHORT_ANSWER_QUESTION_TAB;
        break;
      case QuestionType.ESSAY:
        tab = TabInTab.ESSAY_QUESTION_TAB;
        break;
      case QuestionType.TRUE_FALSE:
        tab = TabInTab.TRUE_FALSE_QUESTION_TAB;
        break;
      default:
        toast.error("Invalid question type");
        break;
    }
    if (tab) onTabInTabChange(tab);
  };

  const buttons = [
    <CreateQuestionDialog key={0} onAddQuestion={handleAddQuestion} />,
  ];

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="py-4 space-y-2">
        <h4 className="text-orange-600">Question bank</h4>
        <QuestionTable data={questionBank} buttons={buttons} />
      </div>
    </div>
  );
};

export default TabQuestionBank;
