"use client";
import { Course } from "@/models/course";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  course: Course;
}
const TeacherCourseCard = ({ course }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/course/${course.id}`);
  };
  return (
    <div
      className="flex flex-col min-w-[200px] h-fit rounded-lg overflow-hidden text-gray-700 border-[0.5px] border-gray-200 shadow hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src="/astronomy-bg.jpg"
        alt="Course title"
        width={300}
        height={200}
        className="w-full h-[120px] object-cover"
      />
      <div className="w-full p-4 space-y-2">
        <div>
          <h6>{course.title}</h6>
          <p className="text-sm text-gray-500">{course.category}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherCourseCard;
