import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
import { CircleCheck, TriangleAlert } from "lucide-react";

const bannerVariants = cva(
  "w-full border text-center p-4 text-sm flex items-center gap-2",
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
  label: string;
  className?: ClassValue;
}
const iconMap = {
  warning: TriangleAlert,
  success: CircleCheck,
};
const Banner = ({ label, variant = "warning", className }: Props) => {
  const Icon = variant
    ? iconMap[variant as keyof typeof iconMap]
    : iconMap.warning;
  return (
    <div className={cn(bannerVariants({ variant }), className)}>
      <Icon size={14} />
      {label}
    </div>
  );
};

export default Banner;
