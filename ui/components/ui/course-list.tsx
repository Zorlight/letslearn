import { Course } from "@/models/course";
import CourseCard from "./course-card";

interface Props {
  courses: Course[];
}
const CourseList = ({ courses }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses.length === 0 && (
          <div className="text-sm text-slate-600 mx-auto">No courses found</div>
        )}
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
