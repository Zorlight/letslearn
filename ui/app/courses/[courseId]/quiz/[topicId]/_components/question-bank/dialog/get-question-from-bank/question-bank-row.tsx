import { Checkbox } from "@/lib/shadcn/checkbox";
import { Question } from "@/models/question";
import React from "react";
import { questionIconMap } from "../../../static-data";
import { SearchCheck } from "lucide-react";

interface Props {
  question: Question;
  onReviewQuestion?: () => void;
  onQuestionCheck?: () => void;
  checked?: boolean;
}
const QuestionBankRow = ({
  question,
  checked = false,
  onReviewQuestion,
  onQuestionCheck,
}: Props) => {
  const { type, questionName, questionText } = question;
  const handleCheckedChange = () => {
    if (onQuestionCheck) onQuestionCheck();
  };
  return (
    <div className="flex flex-row items-center gap-3 py-2 px-4 odd:bg-gray-100 hover:bg-gray-50">
      <Checkbox checked={checked} onCheckedChange={handleCheckedChange} />
      <span>{questionIconMap[type]}</span>
      <span className="truncate w-[250px]">{questionName}</span>
      <span className="truncate w-[250px]">{questionText}</span>
      <SearchCheck
        className="ml-auto cursor-pointer text-cyan-600 hover:text-cyan-500"
        size={20}
        onClick={onReviewQuestion}
      />
    </div>
  );
};

export default QuestionBankRow;
