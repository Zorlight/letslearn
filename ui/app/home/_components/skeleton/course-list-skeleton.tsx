import Rectangle from "@/components/ui/skeleton/rectangle";
import CourseJoiningCode from "../course-joining-code";

export default function CourseListSkeleton() {
  return (
    <div className="w-full h-fit grid grid-cols-3 gap-5 m-5">
      <CourseJoiningCode disabled={true} />
      {[...Array(8).keys()].map((_, index) => (
        <Rectangle key={index} />
      ))}
    </div>
  );
}
