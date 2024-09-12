import NavRoutes from "@/app/(dashboard)/_components/nav-routes";
import { Course } from "@/models/course";

interface Props {
  course: Course;
}
const CourseNavbar = ({ course }: Props) => {
  const {} = course;
  return (
    <div
      id="course-navbar"
      className="border-b w-full h-full flex flex-row items-center p-6 shadow-sm"
    >
      <NavRoutes />
    </div>
  );
};

export default CourseNavbar;
