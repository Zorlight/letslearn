import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
import React from "react";

const iconBadgeVariants = cva("rounded-full ", {
  variants: {
    variant: {
      default: "bg-indigo-100 text-indigo-950",
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
});

interface Props extends VariantProps<typeof iconBadgeVariants> {
  icon: React.ReactNode;
  className?: ClassValue;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const IconBadge = ({
  icon,
  className,
  variant = "default",
  size = "default",
}: Props) => {
  return (
    <div className={cn(iconBadgeVariants({ variant, size }), className)}>
      {icon}
    </div>
  );
};

export default IconBadge;
