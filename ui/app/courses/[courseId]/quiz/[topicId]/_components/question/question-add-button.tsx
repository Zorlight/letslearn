import { Button } from "@/lib/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/shadcn/dropdown-menu";
import { CirclePlus } from "lucide-react";

interface Props {
  onAddNewQuestion?: () => void;
  onAddQuestionFromBank?: () => void;
}
const QuestionAddButton = ({
  onAddNewQuestion,
  onAddQuestionFromBank,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="h-fit p-0 space-x-1">
          Add
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white font-sans z-50">
        <DropdownMenuItem
          className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer ease-linear duration-100"
          onClick={onAddNewQuestion}
        >
          <CirclePlus size={16} />
          <p>A new question</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer ease-linear duration-100"
          onClick={onAddQuestionFromBank}
        >
          <CirclePlus size={16} />
          <p>From question bank</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuestionAddButton;
