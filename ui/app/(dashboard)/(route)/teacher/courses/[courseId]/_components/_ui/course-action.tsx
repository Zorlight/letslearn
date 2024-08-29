"use client";
import { Button } from "@/lib/shadcn/button";
import { useAppDispatch } from "@/redux/hooks";
import { openConfetti } from "@/redux/slices/confetti";
import { Trash2 } from "lucide-react";

interface Props {
  courseId: string;
  disabled: boolean;
  isPublished: boolean;
}
const CourseAction = ({ courseId, disabled, isPublished }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-row items-center gap-2">
      <Button
        variant="outline"
        className=""
        onClick={() => dispatch(openConfetti())}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button variant="default" className="" size="icon">
        <Trash2 size={16} />
      </Button>
    </div>
  );
};

export default CourseAction;
