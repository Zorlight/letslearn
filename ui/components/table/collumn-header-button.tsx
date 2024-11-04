import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  canSort?: boolean;
}

export const CollumnHeaderButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, canSort = true, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "w-fit px-2 py-2 gap-1 outline-none border-0 whitespace-nowrap text-gray-800 hover:opacity-75 bg-transparent transition-all ease-linear duration-100 disabled:bg-gray-100/60 rounded-md flex flex-row items-center justify-center cursor-pointer disabled:cursor-default font-bold",
          canSort ? "select-none" : "",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
CollumnHeaderButton.displayName = "CollumnHeaderButton";
