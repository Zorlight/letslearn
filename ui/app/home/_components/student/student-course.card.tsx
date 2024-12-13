"use client";
import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { Course } from "@/models/course";
import { User } from "@/models/user";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  course: Course;
  user?: User;
}
const StudentCourseCard = ({ course, user }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/course/${course.id}`);
  };
  let hasJoined = false;
  if (!user) hasJoined = false;
  else if (course.studentIds.includes(user.id)) hasJoined = true;

  return (
    <div
      className={cn(
        "flex flex-col min-w-[200px] h-fit rounded-lg overflow-hidden text-gray-700 border-[0.5px] border-gray-200 shadow hover:shadow-md transition-all duration-200 group",
        hasJoined && "cursor-pointer"
      )}
      onClick={hasJoined ? handleClick : undefined}
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
        {!hasJoined && (
          <Button
            variant="outline"
            onClick={handleClick}
            className="w-full border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-700 cursor-pointer "
          >
            Join
          </Button>
        )}
      </div>
    </div>
  );
};

export default StudentCourseCard;
