"use client";
import { fakeChapters } from "@/fake-data/chapter";
import { fakeCourses } from "@/fake-data/course";
import { Course } from "@/models/course";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { useState } from "react";
import CourseAction from "./_components/_ui/course-action";
import CourseItemLayout from "./_components/_ui/course-item-layout";
import ChapterForm from "./_components/course-chapter/chapter-form";
import CategoryForm from "./_components/course-info/category-form";
import DescriptionForm from "./_components/course-info/description-form";
import ImageForm from "./_components/course-info/image-form";
import TitleForm from "./_components/course-info/title-form";
import PriceForm from "./_components/course-price/price-form";
import AttachmentForm from "./_components/course-resource/attachment-form";

interface Props {
  params: {
    courseId: string;
  };
}
const CourseEditPage = ({ params }: Props) => {
  const { courseId } = params;
  const [course, setCourse] = useState(fakeCourses[0]);
  const { title, description, imageUrl, price, categoryId } = course;
  const requireFields = [title, description, imageUrl, price, categoryId];
  const currentFields = requireFields.filter((field) => field).length;

  const isCompleted = currentFields === requireFields.length;

  const handleCourseChange = (course: Course) => {
    setCourse(course);
  };

  return (
    <div className="p-6">
      <div className="w-full flex flex-row items-start justify-between">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="font-medium text-2xl">Course setup</h1>
          <p className="text-sm text-gray-600 font-medium">
            {`Completed fields: (${currentFields}/${requireFields.length})`}
          </p>
        </div>
        <CourseAction
          courseId={courseId}
          disabled={!isCompleted}
          isPublished={course.isPublished}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <CourseItemLayout
          icon={<LayoutDashboard />}
          title="Customize your course"
        >
          <TitleForm
            data={course}
            courseId={courseId}
            onChange={handleCourseChange}
          />
          <DescriptionForm
            data={course}
            courseId={courseId}
            onChange={handleCourseChange}
          />
          <ImageForm
            data={course}
            courseId={courseId}
            onChange={handleCourseChange}
          />
          <CategoryForm
            data={course}
            courseId={courseId}
            onChange={handleCourseChange}
          />
        </CourseItemLayout>

        <CourseItemLayout icon={<ListChecks />} title="Course chapter">
          <ChapterForm data={fakeChapters} courseId={courseId} />
        </CourseItemLayout>
        <CourseItemLayout icon={<CircleDollarSign />} title="Course price">
          <PriceForm
            data={course}
            courseId={courseId}
            onChange={handleCourseChange}
          />
        </CourseItemLayout>
        <CourseItemLayout icon={<File />} title="Resource & Attachment">
          <AttachmentForm data={course} courseId={courseId} />
        </CourseItemLayout>
      </div>
    </div>
  );
};

export default CourseEditPage;
