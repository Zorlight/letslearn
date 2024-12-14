"use client";
import { Textarea } from "@/lib/shadcn/textarea";
import { cn } from "@/lib/utils";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import Part from "../part";
import { useState } from "react";
import { Check, RefreshCcw } from "lucide-react";
import IconButton from "@/components/buttons/icon-button";
import { updateAssignmentResponse } from "@/services/assignment-response";
import { AssignmentTopic } from "@/models/topic";
import { toast } from "react-toastify";
interface Props {
  className?: string;
  assignment: AssignmentTopic;
  studentResponse: StudentResponse;
  onStudentResponseChange?: (studentResponse: StudentResponse) => void;
}
export default function NoteView({
  assignment,
  studentResponse,
  className,
  onStudentResponseChange,
}: Props) {
  const { note } = studentResponse.data as AssignmentResponseData;
  const [noteInput, setNoteInput] = useState<string>(note);
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteInput(e.target.value);
  };
  const handleSaveSuccess = (data: StudentResponse) => {
    if (onStudentResponseChange) onStudentResponseChange(data);
  };
  const handleSaveFail = (err: any) => {
    toast.error(err);
  };
  const handleSave = () => {
    const updatedAssignmentResponse: StudentResponse = {
      ...studentResponse,
      data: {
        ...studentResponse.data,
        note: noteInput,
      },
    };

    updateAssignmentResponse(
      assignment.id,
      updatedAssignmentResponse,
      handleSaveSuccess,
      handleSaveFail
    );
  };
  const handleReset = () => {
    setNoteInput(note);
  };
  return (
    <Part
      title="Note"
      className={cn(
        "h-full pt-4 border-t-[0.5px] border-gray-400 gap-0",
        className
      )}
      titleClassName="text-orange-500"
    >
      <div className="h-full flex flex-row items-start gap-2">
        <Textarea
          defaultValue={note}
          className="h-full border-0 resize-none default-scrollbar p-0 placeholder:italic rounded-none"
          placeholder="Write a note here..."
          onChange={handleNoteChange}
        />
        <div
          className={cn(
            "flex flex-col opacity-0 transition-all duration-200",
            noteInput !== note && "opacity-100"
          )}
        >
          <IconButton onClick={handleSave}>
            <Check className="text-green-500" size={20} />
          </IconButton>
          <IconButton onClick={handleReset}>
            <RefreshCcw className="text-gray-500" size={20} />
          </IconButton>
        </div>
      </div>
    </Part>
  );
}
