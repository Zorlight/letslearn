"use client";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {}
const CourseCard = () => {
  const router = useRouter();
  const handleCardClick = () => {
    router.push("/course/1");
  };
  return (
    <div
      className="flex flex-col min-w-[200px] h-fit rounded-lg overflow-hidden text-gray-700 border-[0.5px] border-gray-200 cursor-pointer hover:shadow-md transition-all duration-200 group"
      onClick={handleCardClick}
    >
      <Image
        src="/astronomy-bg.jpg"
        alt="Course title"
        width={300}
        height={200}
        className="w-full h-[120px] object-cover"
      />
      <div className="p-4">
        <div className="flex flex-row items-center justify-between ">
          <h6 className="group-hover:text-indigo-600">
            Introduce to Astronomy
          </h6>
          <MoreVertical />
        </div>
        <p className="text-gray-500 group-hover:text-indigo-600">Astronomy</p>
      </div>
    </div>
  );
};

export default CourseCard;
