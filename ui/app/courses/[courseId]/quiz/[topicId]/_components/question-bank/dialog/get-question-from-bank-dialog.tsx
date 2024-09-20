"use client";
import { Button } from "@/lib/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/lib/shadcn/dialog";
import { Question } from "@/models/question";
import { useMemo, useState } from "react";
import QuestionBankList from "./get-question-from-bank/question-bank-list";

interface Props {
  questions: Question[];
  questionsBank: Question[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
  onAddQuestionFromBank?: (question: Question[]) => void;
}
const GetQuestionFromBankDialog = ({
  open,
  questions,
  questionsBank,
  onOpenChange,
  onAddQuestionFromBank,
  children,
}: Props) => {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const questionToShowInBankList = useMemo(() => {
    return questionsBank.filter(
      (q) => !questions.some((question) => question.id === q.id)
    );
  }, [questions, questionsBank]);

  const handleAddQuestion = () => {
    setSelectedQuestions([]);
    onOpenChange(false);
    if (onAddQuestionFromBank) onAddQuestionFromBank(selectedQuestions);
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
