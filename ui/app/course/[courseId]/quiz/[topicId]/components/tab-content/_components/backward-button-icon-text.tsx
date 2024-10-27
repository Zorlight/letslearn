import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface Props {
  onClick?: () => void;
  className?: string;
}
const BackwardButtonIconText = ({ onClick, className }: Props) => {
  return (
    <Button
      className={cn("rounded-full group", className)}
      variant="link"
      size="sm"
      onClick={onClick}
    >
      <ArrowLeft
        size={16}
        className="group-hover:-translate-x-1 transition-all duration-100"
      />
      <span>Go back</span>
    </Button>
  );
};

export default BackwardButtonIconText;
