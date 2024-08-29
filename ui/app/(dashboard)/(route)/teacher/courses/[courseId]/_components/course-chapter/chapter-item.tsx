import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { Chapter } from "@/models/chapter";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Grip, Pen } from "lucide-react";

interface Props {
  chapter: Chapter;
  onEdit?: () => void;
  provided: DraggableProvided;
}
const ChapterItem = ({ chapter, onEdit, provided }: Props) => {
  return (
    <div
      className="flex flex-row items-center bg-indigo-100 rounded-md"
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div {...provided.dragHandleProps} className="p-2">
        <Grip size={20} className="cursor-pointer" />
      </div>
      <span className="text-sm font-medium ">{chapter.title}</span>

      <div className="ml-auto flex flex-row gap-4 p-2 items-center">
        <span className="text-sm font-medium text-red-500">
          TODO: Icon free chapter
        </span>
        <Button
          variant="default"
          size="sm"
          className={cn(
            "bg-slate-600 hover:bg-slate-500 text-white rounded-full px-4 py-1 h-fit",
            chapter.isPublished && "bg-indigo-950 hover:bg-indigo-900"
          )}
        >
          {chapter.isPublished ? "Published" : "Draft"}
        </Button>
        <Pen
          size={16}
          className="cursor-pointer text-indigo-950 hover:opacity-75"
          onClick={onEdit}
        />
      </div>
    </div>
  );
};

export default ChapterItem;
