"use client";
import { Button } from "@/lib/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/lib/shadcn/dialog";
import { Question, QuestionStatus, QuestionType } from "@/models/question";
import { useMemo, useState } from "react";
import QuestionBankList from "./get-question-from-bank/question-bank-list";
import { useRouter } from "next/navigation";

interface Props {
  courseId: string;
  questionsBank: Question[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
  onAddQuestionsFromBank?: (question: Question[]) => void;
}
const GetQuestionFromBankDialog = ({
  courseId,
  open,
  questionsBank,
  onOpenChange,
  onAddQuestionsFromBank,
  children,
}: Props) => {
  const router = useRouter();
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const questionToShowInBankList = useMemo(() => {
    return questionsBank.filter((q) => q.status === QuestionStatus.READY);
  }, [questionsBank]);

  const handleAddQuestion = () => {
    if (onAddQuestionsFromBank) onAddQuestionsFromBank(selectedQuestions);
    setSelectedQuestions([]);
    onOpenChange(false);
  };
  const handleCancel = () => {
    setSelectedQuestions([]);
    onOpenChange(false);
  };
  const handleSelectedQuestionChange = (question: Question) => {
    const newSelectedQuestions = [...selectedQuestions];
    const index = selectedQuestions.findIndex((q) => q.id === question.id);

    if (index !== -1) newSelectedQuestions.splice(index, 1);
    else newSelectedQuestions.push(question);

    setSelectedQuestions(newSelectedQuestions);
  };
  const toggleSelectAll = () => {
    if (selectedQuestions.length === 0)
      setSelectedQuestions(questionToShowInBankList);
    else setSelectedQuestions([]);
  };
  const handleReviewQuestion = (question: Question) => {
    const prefix = courseId ? `/course/${courseId}` : "";
    const { type } = question;
    if (type === QuestionType.CHOICE)
      router.push(`${prefix}/question/choice/edit/${question.id}`);
    else if (type === QuestionType.SHORT_ANSWER)
      router.push(`${prefix}/question/short-answer/edit/${question.id}`);
    else if (type === QuestionType.TRUE_FALSE)
      router.push(`${prefix}/question/true-false/edit/${question.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <h5 className="text-orange-600 font-bold">
            Add question from bank to quiz
          </h5>
        </DialogHeader>
        <div className="h-min flex flex-row">
          <QuestionBankList
            selectedQuestions={selectedQuestions}
            questions={questionToShowInBankList}
            onQuestionCheck={handleSelectedQuestionChange}
            onReviewQuestion={handleReviewQuestion}
          />
        </div>
        <DialogFooter>
          <div className="w-full flex flex-row items-center justify-between">
            <Button
              variant="link"
              className="p-0 h-fit"
              onClick={toggleSelectAll}
            >
              {selectedQuestions.length === 0 ? "Select all" : "Unselect all"}
            </Button>
            <div className="flex flex-row gap-2">
              <Button variant="default" onClick={handleAddQuestion}>
                Add
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GetQuestionFromBankDialog;
