"use client";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  CheckIcon,
  ChevronDown,
  CirclePlay,
  LockIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CourseSidebarChapterItem from "./course-sidebar-chapter-item";
import { Topic } from "@/models/topic";

interface Props {
  chapterId: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  contents: Topic[];
}
const CourseSidebarChapter = ({
  chapterId,
  label,
  isCompleted,
  courseId,
  isLocked,
  contents,
}: Props) => {
  const path = usePathname();
  const router = useRouter();
  const Icon = isLocked ? LockIcon : isCompleted ? CheckIcon : CirclePlay;
  const isActive = path.includes(`chapters/${chapterId}`);
  const handleClick = () => {
    if (!showContent) setShowContent(true);
    router.push(`/courses/${courseId}/chapters/${chapterId}`);
  };
  const [showContent, setShowContent] = useState(true);
  const [chapterContents, setChapterContents] = useState<Topic[]>([]);

  // useEffect(() => {
  //   const filterContent = (chapterId: string) => {
  //     return contents.filter((content) => content.chapterId === chapterId);
  //   };
  //   setChapterContents(filterContent(chapterId));
  // }, [chapterId, contents]);
  return (
    <>
      <div
        className={cn(
          "relative pl-6 pr-2 flex flex-row items-center transition-all text-sm text-slate-500 bg-slate-100 cursor-pointer hover:text-slate-600 hover:bg-indigo-50 ease-linear duration-200",
          isActive &&
            "text-indigo-600 bg-indigo-50 hover:text-indigo-600 hover:bg-indigo-50",
          isCompleted &&
            "text-green-500 bg-green-50 hover:text-green-600 hover:bg-green-100"
        )}
        onClick={handleClick}
      >
        <div className="flex flex-row items-center gap-2 py-4">
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </div>
        <div className="h-full ml-auto flex items-center">
          <ChevronDown
            onClick={(e) => {
              e.stopPropagation();
              setShowContent(!showContent);
            }}
          />
          <div
            className={cn(
              "absolute right-0 opacity-0 border-2 border-indigo-900 h-full transition-all",
              isActive && "opacity-100",
              isCompleted && "border-green-700"
            )}
          ></div>
        </div>
      </div>
      {showContent && (
        <div className="w-full flex flex-col">
          {chapterContents.map((content, index) => (
            <CourseSidebarChapterItem key={index} content={content} />
          ))}
        </div>
      )}
    </>
  );
};

export default CourseSidebarChapter;
