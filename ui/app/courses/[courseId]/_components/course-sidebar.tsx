import { Course } from "@/models/course";
import CourseSidebarSection from "./course-sidebar-section";

interface Props {
  course: Course;
}
const CourseSidebar = ({ course }: Props) => {
  return (
    <div className="h-full overflow-y-auto shadow-sm flex flex-col border-r">
      <div className="flex flex-col w-full">
        {course.sections.map((section, index) => {
          return (
            <CourseSidebarSection
              key={index}
              courseId={course.id}
              section={section}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseSidebar;
