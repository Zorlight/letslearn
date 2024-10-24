import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "no-border";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex items-center h-fit w-full rounded-md outline-none bg-white px-3 py-2 text-sm placeholder:text-slate-500 hover:border-gray-400 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
          variant === "default" && "border border-gray-300",
          variant === "no-border" &&
            "rounded-none h-fit border-b border-gray-300 underline-offset-2 py-0 pl-0 pr-2",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
