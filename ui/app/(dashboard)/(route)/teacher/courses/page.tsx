import CourseTable from "./_components/course-table";
import { coursesData } from "./_components/fake.data";

const CoursePage = () => {
  return (
    <div className="p-6 flex flex-col gap-2">
      <CourseTable courses={coursesData} />
    </div>
  );
};

export default CoursePage;
