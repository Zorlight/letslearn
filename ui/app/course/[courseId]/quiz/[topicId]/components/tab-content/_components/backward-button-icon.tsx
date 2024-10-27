import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface Props {
  onClick?: () => void;
  className?: string;
}
const BackwardButtonIcon = ({ onClick, className }: Props) => {
  return (
    <Button
      className={cn("rounded-full group hover:shadow-lg", className)}
      variant="outline"
      size="icon"
      onClick={onClick}
    >
      <ArrowLeft
        size={16}
        className="group-hover:-translate-x-1 transition-all duration-100"
      />
    </Button>
  );
};

export default BackwardButtonIcon;
