"use client";
import { Button } from "@/lib/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/shadcn/dropdown-menu";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

interface Props {
  onAddNewQuestion?: () => void;
  onAddQuestionFromBank?: () => void;
}
const QuestionAddButton = ({
  onAddNewQuestion,
  onAddQuestionFromBank,
}: Props) => {
  const [open, setOpen] = useState(false);
  const handleAddNewQuestion = () => {
    if (onAddNewQuestion) onAddNewQuestion();
    setOpen(false);
  };
  const handleAddQuestionFromBank = () => {
    if (onAddQuestionFromBank) onAddQuestionFromBank();
    setOpen(false);
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="h-fit text-cyan-700 p-0 space-x-1">
          Add
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white font-sans z-50">
        {/* <DropdownMenuItem
          className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer ease-linear duration-100"
          onClick={handleAddNewQuestion}
        >
          <CirclePlus size={16} />
          <p>A new question</p>
        </DropdownMenuItem> */}
        <DropdownMenuItem
          className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer ease-linear duration-100"
          onClick={handleAddQuestionFromBank}
        >
          <CirclePlus size={16} />
          <p>From question bank</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuestionAddButton;
