import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { Chapter } from "@/models/chapter";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Grip, Pen } from "lucide-react";

interface Props {
  className?: string;
  controlButtonClassName?: string;
  provided: DraggableProvided;
  children?: React.ReactNode;
}
const DraggableItem = ({
  provided,
  className,
  children,
  controlButtonClassName,
}: Props) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row items-center bg-indigo-100 rounded-md overflow-hidden",
        className
      )}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div
        {...provided.dragHandleProps}
        className={cn("p-2", controlButtonClassName)}
      >
        <Grip size={20} className="cursor-pointer" />
      </div>

      {children}
    </div>
  );
};

export default DraggableItem;
