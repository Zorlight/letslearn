"use client";
import { useState } from "react";
import JoinCodeButton from "./join-code-button";
import JoiningCodeView from "./joining-code-view";

interface Props {
  onSubmitCode?: (code: string) => void;
}
const CourseJoiningCode = ({ onSubmitCode }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative min-h-[200px]">
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
