"use client";
import { cn } from "@/lib/utils";
import { Section, Topic } from "@/models/course";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CourseSidebarTopicItem from "./course-sidebar-topic-";
import Link from "next/link";

interface Props {
  courseId: string;
  section: Section;
}
const CourseSidebarSection = ({ section, courseId }: Props) => {
  const { topics, id, title } = section;
  const path = usePathname();
  const router = useRouter();
  const isActive = path.includes(`/courses/${courseId}/#${id}`);
  const [showContent, setShowContent] = useState(true);
  const [topicContents, setTopicContents] = useState<Topic[]>([]);

  const scrollToSection = (id: string) => {
    if (typeof window === undefined) return;
    const topPositionOfSection = document!.getElementById(
      `section-${id}`
    )!.offsetTop;
    const navbarHeight =
      document!.getElementById("course-navbar")!.offsetHeight;

    // Scroll with adjustment for the navbar height
    window.scrollTo({
      top: topPositionOfSection - navbarHeight - 20,
      behavior: "smooth",
    });
  };

  const handleSectionClick = () => {
    if (!showContent) setShowContent(true);
    scrollToSection(id);
  };

  const handleTopicClick = (e: any) => {
    e.stopPropagation();
    scrollToSection(id);
  };

  useEffect(() => {
    const filterSectionContent = (id: string) => {
      return topics.filter((topic) => topic.sectionId === id);
    };
    setTopicContents(filterSectionContent(id));
  }, [id, topics]);
  return (
    <>
      <div
        className={cn(
          "relative pl-6 pr-2 flex flex-row items-center transition-all text-sm text-slate-500 bg-slate-100 cursor-pointer hover:text-slate-600 hover:bg-indigo-50 ease-linear duration-200",
          isActive &&
            "text-indigo-600 bg-indigo-50 hover:text-indigo-600 hover:bg-indigo-50"
        )}
        onClick={handleSectionClick}
      >
        <div className="flex flex-row items-center gap-2 py-4">
          <h1 className="text-lg font-bold">{title}</h1>
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
              isActive && "opacity-100"
            )}
          ></div>
        </div>
      </div>
      {showContent && (
        <div className="w-full flex flex-col">
          {topicContents.map((content, index) => (
            <CourseSidebarTopicItem
              key={index}
              content={content}
              onClick={handleTopicClick}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CourseSidebarSection;
