"use client";
import { Course } from "@/models/course";
import CourseSidebarSection from "./course-sidebar-section";
import { useState } from "react";

interface Props {
  course: Course;
}
const CourseSidebar = ({ course }: Props) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
  };
  return (
    <div className="h-full overflow-y-auto shadow-sm flex flex-col border-r">
      <div className="flex flex-col w-full">
        {course.sections.map((section, index) => {
          return (
            <CourseSidebarSection
              key={index}
              courseId={course.id}
              section={section}
              isActive={activeSection === section.id}
              onClick={() => handleSectionClick(section.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseSidebar;
