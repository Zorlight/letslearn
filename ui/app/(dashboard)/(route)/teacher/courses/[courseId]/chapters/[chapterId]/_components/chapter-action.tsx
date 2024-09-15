import { Button } from "@/lib/shadcn/button";
import { Trash2 } from "lucide-react";

interface Props {
  courseId: string;
  chapterId: string;
  disabled: boolean;
  isPublished: boolean;
}
const ChapterAction = ({
  courseId,
  chapterId,
  disabled,
  isPublished,
}: Props) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Button variant="outline" size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button variant="default" className="" size="icon">
        <Trash2 size={16} />
      </Button>
    </div>
  );
};

export default ChapterAction;
