import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "no-border";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full outline-none rounded-md bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 disabled:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
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
Input.displayName = "Input";

export { Input };
