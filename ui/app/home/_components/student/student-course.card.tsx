"use client";
import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { Course } from "@/models/course";
import { User } from "@/models/user";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
  course: Course;
  onJoinCourse?: (code: string) => void;
}
const StudentCourseCard = ({ course, onJoinCourse }: Props) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.profile.value);
  const handleClick = () => {
    if (onJoinCourse) onJoinCourse(course.id);
  };
  let hasJoined = useMemo(() => {
    if (!user) return false;
    const courseIdList = user.courses.map((course) => course.id);
    return courseIdList.includes(course.id);
  }, [user, course.id]);

  return (
    <div
      className={cn(
        "flex flex-col min-w-[200px] h-full rounded-lg overflow-hidden text-gray-700 border-[0.5px] border-gray-200 shadow hover:shadow-md transition-all duration-200 group",
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
