"use client";
import IconButton from "@/components/buttons/icon-button";
import { Textarea } from "@/lib/shadcn/textarea";
import { cn } from "@/lib/utils";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { AssignmentTopic } from "@/models/topic";
import { updateAssignmentResponse } from "@/services/assignment-response";
import { Check, RefreshCcw } from "lucide-react";
import { useRef } from "react";
import { toast } from "react-toastify";
import Part from "../part";
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
  const noteInputRef = useRef<HTMLTextAreaElement>(null);
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!noteInputRef.current) return;
    noteInputRef.current.value = e.target.value;
  };
  const handleSaveSuccess = (data: StudentResponse) => {
    toast.success("Note saved");
    if (onStudentResponseChange) onStudentResponseChange(data);
  };
  const handleSaveFail = (err: any) => {
    toast.error(err);
  };
  const handleSave = () => {
    if (!noteInputRef.current) return;
    const updatedAssignmentResponse: StudentResponse = {
      ...studentResponse,
      data: {
        ...studentResponse.data,
        note: noteInputRef.current.value,
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
    if (!noteInputRef.current) return;
    noteInputRef.current.value = note;
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
          ref={noteInputRef}
          defaultValue={note}
          className="h-full border-0 resize-none default-scrollbar p-0 placeholder:italic rounded-none"
          placeholder="Write a note here..."
          onChange={handleNoteChange}
        />
        <div
          className={cn(
            "flex flex-col opacity-0 transition-all duration-200",
            noteInputRef.current?.value !== note && "opacity-100"
          )}
        >
          <IconButton onClick={handleSave} className="hover:bg-green-50">
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
