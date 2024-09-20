import { Button } from "@/lib/shadcn/button";
import { Question } from "@/models/question";
import { Trash2 } from "lucide-react";
import { questionIconMap } from "../static-data";

interface Props {
  rowIndex: number;
  data: Question;
  onRemove?: (index: number) => void;
}
const QuestionRow = ({ data, rowIndex, onRemove }: Props) => {
  const { type, questionName } = data;

  const handleRemove = () => {
    if (onRemove) onRemove(rowIndex);
  };
  return (
    <div className="flex-1 px-2">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <p className="text-sm">{rowIndex + 1}</p>
          <p>{questionIconMap[type]}</p>
          <Button variant="link" className="h-fit px-2 py-0">
            {questionName}
          </Button>
        </div>
        <div className="flex flex-row items-center">
          <Trash2
            size={16}
            className="cursor-pointer hover:text-red-500 transition-all duration-200"
            onClick={handleRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionRow;
