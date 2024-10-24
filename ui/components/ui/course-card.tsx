"use client";
import ImageDisplay from "@/lib/cloudinary/image-display";
import { displayNumber } from "@/lib/utils";
import { Course } from "@/models/course";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import IconBadge from "./simple/icon-badge";
interface Props {
  course: Course;
}
const CourseCard = ({ course }: Props) => {
  const url = `/courses/${course.id}`;
  const { imageUrl, title, price } = course;
  return (
    <Link href={url}>
      <div className="h-full border rounded-lg p-3 hover:shadow-md transition-all overflow-hidden group">
        <div className="w-full aspect-video rounded-md overflow-hidden">
          <ImageDisplay imageUrl={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <h3 className="font-bold line-clamp-2 transition-all group-hover:text-indigo-600">
            {title}
          </h3>
          {/* <p className="text-sm text-slate-600">
            {category ? category.name : "No category"}
          </p> */}
          <div className="my-3 flex flex-row items-center gap-2">
            <IconBadge icon={<BookOpen size={16} />} />
            {/* <span className="text-sm text-slate-600">{`${length} ${
              length <= 1 ? "Chapter" : "Chapters"
            }`}</span> */}
          </div>
          <p className="text-sm text-indigo-950">{displayNumber(price, "$")}</p>
          {/* {progress != null ? (
            <>
              <Progress value={progress} />
              <span
                className={cn(
                  "text-sm text-indigo-700 mt-1",
                  progress >= 100 && "text-green-500"
                )}
              >
                {Math.round(progress)}% Complete{" "}
              </span>
            </>
          ) : (
            <p className="text-sm text-indigo-950">
              {displayNumber(price, "$")}
            </p>
          )} */}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
