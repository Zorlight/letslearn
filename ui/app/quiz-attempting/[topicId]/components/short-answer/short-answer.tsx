import { Input } from "@/lib/shadcn/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
  correctAnswers: string[];
  showCorrectAnswer?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
}
const ShortAnswer = ({
  correctAnswers,
  showCorrectAnswer,
  defaultValue,
  onChange,
}: Props) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue || "");

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (onChange) onChange(value);
  };

  const isCorrect = correctAnswers.includes(inputValue);

  return (
    <div className={cn("flex flex-row items-center gap-2")}>
      <Input
        defaultValue={defaultValue}
        placeholder="Type your answer here"
        onChange={(e) => handleInputChange(e.target.value)}
        disabled={showCorrectAnswer}
        className={cn(
          "w-2/3 disabled:opacity-100 disabled:text-slate-400",
          isCorrect && "disabled:border-green-500",
          !isCorrect && "disabled:border-red-500"
        )}
      />
      {showCorrectAnswer && isCorrect && (
        <span className="text-green-500">✓</span>
      )}

      {showCorrectAnswer && !isCorrect && (
        <span className="text-red-500">✗</span>
      )}
    </div>
  );
};

export default ShortAnswer;
