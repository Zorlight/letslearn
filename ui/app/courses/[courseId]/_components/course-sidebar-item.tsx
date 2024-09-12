"use client";
import { cn } from "@/lib/utils";
import { CheckIcon, CirclePlay, LockIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  chapterId: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}
const CourseSidebarItem = ({
  chapterId,
  label,
  isCompleted,
  courseId,
  isLocked,
}: Props) => {
  const path = usePathname();
  const router = useRouter();
  const Icon = isLocked ? LockIcon : isCompleted ? CheckIcon : CirclePlay;
  const isActive = path.includes(`chapters/${chapterId}`);
  const handleClick = () => {
    router.push(`/courses/${courseId}/chapters/${chapterId}`);
  };
  return (
    <div
      className={cn(
        "pl-6 flex flex-row items-center transition-all text-sm text-slate-500 cursor-pointer hover:text-slate-600 hover:bg-indigo-50",
        isActive &&
          "text-indigo-600 bg-indigo-50 hover:text-indigo-600 hover:bg-indigo-50",
        isCompleted && "text-green-500 hover:text-green-600"
      )}
      onClick={handleClick}
    >
      <div className="flex flex-row items-center gap-2 py-4">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-indigo-900 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-green-700"
        )}
      ></div>
    </div>
  );
};

export default CourseSidebarItem;
