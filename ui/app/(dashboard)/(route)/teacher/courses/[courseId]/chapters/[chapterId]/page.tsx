"use client";
import { Chapter } from "@/models/chapter";
import { nanoid } from "@reduxjs/toolkit";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ChapterAccessForm from "./_components/chapter-access-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import ChapterTitleForm from "./_components/chapter-title-form";
import ChapterItemLayout from "./_components/chapter-item-layout";
import ChapterVideoForm from "./_components/chapter-video-form";
import Banner from "@/components/ui/banner";
import ChapterAction from "./_components/chapter-action";

interface Props {
  params: {
    courseId: string;
    chapterId: string;
  };
}
const chapterData: Chapter = {
  id: nanoid(),
  title: "Chapter 1",
  description: null,
  videoUrl: null,
  position: 0,
  isPublished: true,
  isFree: false,
  userProgress: [],
};

const ChapterEditPage = ({ params }: Props) => {
  const { courseId, chapterId } = params;
  const [chapter, setChapter] = useState(chapterData);

  const { title, description, videoUrl } = chapter;
  const requireFields = [title, description, videoUrl];
  const currentFields = useMemo(
    () => requireFields.filter((field) => field).length,
    [title, description, videoUrl]
  );
  const isCompleted = currentFields === requireFields.length;

  const handleChapterChange = (chapter: Chapter) => {
    setChapter(chapter);
  };
  return (
    <>
      {!chapter.isPublished && (
        <Banner
          label="This chapter is unpublished. It will not be visible to students."
          variant="warning"
          className="mb-4"
        />
      )}
      <div className="p-6">
        <Link
          href={`/teacher/courses/${courseId}`}
          className="w-fit flex items-center gap-2 mb-6 font-medium text-indigo-950 text-md group"
        >
          <ArrowLeft
            size={16}
            className="transition group-hover:-translate-x-2"
          />
          Back to course setup
        </Link>
        <div className="w-full flex flex-row items-start justify-between">
          <div className="flex flex-col gap-2 mb-4">
            <h1 className="font-medium text-2xl">Chapter Creation</h1>
            <p className="text-sm text-gray-600 font-medium">
              {`Completed fields: (${currentFields}/${requireFields.length})`}
            </p>
          </div>
          <ChapterAction
            courseId={courseId}
            chapterId={chapterId}
            disabled={!isCompleted}
            isPublished={chapter.isPublished}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <ChapterItemLayout
            icon={<LayoutDashboard />}
            title="Customize your chapter"
          >
            <ChapterTitleForm
              data={chapter}
              chapterId={chapterId}
              onChange={handleChapterChange}
            />
            <ChapterDescriptionForm
              data={chapter}
              chapterId={chapterId}
              onChange={handleChapterChange}
            />
          </ChapterItemLayout>
          <ChapterItemLayout icon={<Eye />} title="Access settings">
            <ChapterAccessForm
              data={chapter}
              chapterId={chapterId}
              onChange={handleChapterChange}
            />
          </ChapterItemLayout>
          <ChapterItemLayout icon={<Video />} title="Add a video">
            <ChapterVideoForm
              data={chapter}
              chapterId={chapterId}
              onChange={handleChapterChange}
            />
          </ChapterItemLayout>
        </div>
      </div>
    </>
  );
};

export default ChapterEditPage;
