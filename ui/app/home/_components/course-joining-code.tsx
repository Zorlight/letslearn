"use client";
import { useState } from "react";
import JoinCodeButton from "./join-code-button";
import JoiningCodeView from "./joining-code-view";
import { cn } from "@/lib/utils";

interface Props {
  onSubmitCode?: (code: string) => void;
}
const CourseJoiningCode = ({ onSubmitCode }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={cn(
        "relative min-h-[200px] flex items-center justify-center border-[0.5px] border-dashed rounded-lg",
        isOpen && "border-0"
      )}
    >
      <JoinCodeButton open={isOpen} onOpenChange={setIsOpen} />
      <JoiningCodeView
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmitCode={onSubmitCode}
      />
    </div>
  );
};

export default CourseJoiningCode;
