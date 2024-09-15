"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
import { CircleCheck, TriangleAlert, X } from "lucide-react";
import { useState } from "react";

const bannerVariants = cva(
  "sticky top-0 z-50 w-full border text-center p-4 text-sm flex items-center gap-2",
  {
    variants: {
      variant: {
        warning: "bg-yellow-100 border-yellow-500 text-yellow-600",
        error: "bg-red-100 border-red-500 text-red-600",
        success: "bg-green-100 border-green-500 text-green-600",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

interface Props extends VariantProps<typeof bannerVariants> {
  children?: React.ReactNode;
  className?: ClassValue;
  showCloseButton?: boolean;
}
const iconMap = {
  warning: TriangleAlert,
  success: CircleCheck,
};
const Banner = ({
  children,
  variant = "warning",
  className,
  showCloseButton = true,
}: Props) => {
  const Icon = variant
    ? iconMap[variant as keyof typeof iconMap]
    : iconMap.warning;
  const [show, setShow] = useState(true);
  const onClose = () => {
    setShow(false);
  };
  return (
    <div
      className={cn(bannerVariants({ variant }), className, !show && "hidden")}
    >
      <Icon size={16} />
      {children}
      {showCloseButton && (
        <X
          size={16}
          className="ml-auto cursor-pointer hover:opacity-75"
          onClick={onClose}
        />
      )}
    </div>
  );
};

export default Banner;
