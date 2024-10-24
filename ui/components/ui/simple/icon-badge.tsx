"use client";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
import React from "react";

const iconBadgeVariants = cva(
  "rounded-full border border-transparent transition-all ease-linear duration-200 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-500 hover:bg-gray-100",
        gray: "bg-gray-100 text-gray-500 hover:bg-gray-200",
        indigo: "bg-indigo-100 text-indigo-950 hover:border-indigo-950",
        success: "bg-green-100 text-green-600",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface Props extends VariantProps<typeof iconBadgeVariants> {
  icon: React.ReactNode;
  className?: ClassValue;
  variant?: "default" | "indigo" | "gray" | "success";
  size?: "default" | "sm";
  onClick?: () => void;
}

const IconBadge = ({
  icon,
  className,
  variant = "default",
  size = "default",
  onClick,
}: Props) => {
  return (
    <div
      className={cn(
        iconBadgeVariants({ variant, size }),
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default IconBadge;
