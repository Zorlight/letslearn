"use client";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { cn } from "@/lib/utils";
import { Minimize2 } from "lucide-react";
import { useRef } from "react";

interface Props {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmitCode?: (code: string) => void;
}
export default function JoiningCodeView({
  open,
  onOpenChange,
  onSubmitCode,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    if (onOpenChange) onOpenChange(false);
  };
  const onSubmit = (e: any) => {
    if (!inputRef.current) return;
    e.preventDefault();
    if (onSubmitCode) onSubmitCode(inputRef.current.value);
    if (onOpenChange) onOpenChange(false);
    inputRef.current.value = "";
  };
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "absolute w-full h-full min-w-[200px] rounded-lg overflow-hidden text-gray-700 border-[0.5px] border-gray-200 shadow hover:shadow-md transition-all duration-200 scale-0 opacity-0",
        open && "scale-100 opacity-100"
      )}
    >
      <div className="relative h-full flex flex-col items-center justify-end gap-4 p-4">
        <Minimize2
          className="absolute top-4 right-4 text-gray-400 cursor-pointer transition-all duration-200 hover:text-gray-500"
          size={20}
          onClick={handleClose}
        />
        <div className="w-full flex flex-col items-center gap-4">
          <h5>Join with a code</h5>
          <Input ref={inputRef} placeholder="Enter joining code" />
        </div>
        <Button
          type="submit"
          variant="outline"
          className="w-full border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-700 cursor-pointer "
        >
          Join
        </Button>
      </div>
    </form>
  );
}
