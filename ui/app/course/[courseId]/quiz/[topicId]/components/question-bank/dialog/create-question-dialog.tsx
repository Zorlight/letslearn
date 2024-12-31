"use client";
import { Button } from "@/lib/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/lib/shadcn/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  questionIconMap,
  QuestionTypeOption,
  questionTypeOptions,
} from "../../static-data";
import { QuestionType } from "@/models/question";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
  onAddQuestion?: (type: QuestionType) => void;
}
const CreateQuestionDialog = ({
  open,
  onOpenChange,
  onAddQuestion,
  children,
}: Props) => {
  const [selectedType, setSelectedType] = useState<QuestionTypeOption>(
    questionTypeOptions[0]
  );
  const handleSelectType = (type: QuestionTypeOption) => {
    setSelectedType(type);
  };
  const handleAddQuestion = () => {
    if (onAddQuestion) onAddQuestion(selectedType.type);
    onOpenChange(false);
  };
  const handleCancel = () => {
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <h5 className="text-orange-600 font-bold">
            Choose a question type to add
          </h5>
        </DialogHeader>
        <div className="h-min  flex flex-row">
          <div className="w-5/12 pb-10">
            <h5 className="p-4">Question</h5>
            <div className="w-full flex flex-col">
              {questionTypeOptions.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-row items-center gap-4 py-2 px-4 cursor-pointer border-transparent rounded-l-lg hover:bg-indigo-50 transition-all duration-200",
                    selectedType.type == option.type && "bg-indigo-50"
                  )}
                  onClick={() => handleSelectType(option)}
                >
                  <span className="w-4">{questionIconMap[option.type]}</span>
                  <span className="text-sm">{option.type}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-7/12 p-6 space-y-4 bg-indigo-50 rounded-lg overflow-hidden">
            <h5>Description</h5>
            <p>{selectedType.description}</p>
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-row gap-2">
            <Button variant="default" onClick={handleAddQuestion}>
              Add
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestionDialog;
