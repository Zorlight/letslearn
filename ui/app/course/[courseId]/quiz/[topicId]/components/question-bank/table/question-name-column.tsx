import { Input } from "@/lib/shadcn/input";
import { Pen, X } from "lucide-react";
import React, { useState } from "react";

interface Props {
  questionName: string;
  onChange?: (questionName: string) => void;
}
const QuestionNameColumn = ({ questionName, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      if (onChange) onChange(e.currentTarget.value);
    }
  };
  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="h-10 w-[200px] flex flex-row items-center gap-2 px-2">
      {isEditing ? (
        <Input
          type="text"
          defaultValue={questionName}
          onKeyDown={handleKeyDown}
          className="w-[280px]"
        />
      ) : (
        <span>{questionName}</span>
      )}
      {isEditing ? (
        <X
          size={14}
          onClick={toggleEdit}
          className="hover:text-red-600 transition-all duration-200"
        />
      ) : (
        <Pen
          size={14}
          onClick={toggleEdit}
          className="hover:opacity-75 transition-all duration-200"
        />
      )}
    </div>
  );
};

export default QuestionNameColumn;
