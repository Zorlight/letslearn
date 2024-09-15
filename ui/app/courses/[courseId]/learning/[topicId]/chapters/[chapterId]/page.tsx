"use client";
import Banner from "@/components/ui/banner";
import { fakeCourses } from "@/fake-data/course";
import { fakeTopics } from "@/fake-data/topic";
import Preview from "@/lib/react-quill/preview";
import { Button } from "@/lib/shadcn/button";
import { Separator } from "@/lib/shadcn/separator";
import { displayNumber } from "@/lib/utils";
import { Course } from "@/models/course";
import { LearningTopic, TopicType } from "@/models/topic";
import { CheckCircle, File, XCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { fakePurchases } from "@/fake-data/purchase";
import { fakeChapters } from "@/fake-data/chapter";
import ChapterVideoPlayer from "../../_components/chapter-video-display";

interface Props {
  params: {
    courseId: string;
    topicId: string;
    chapterId: string;
  };
}
const ChapterIdPage = ({ params }: Props) => {
  const { courseId, topicId, chapterId } = params;

  //get course by id
  const course = useMemo(() => {
    return fakeCourses.find((course) => course.id === courseId) as Course;
  }, [courseId]);

  //get topics by id
  const topic = useMemo(() => {
    return fakeTopics.find(
      (topic) => topic.id === topicId && topic.type === TopicType.LEARNING
    ) as LearningTopic;
  }, [topicId]);

  //get chapter by id
  const chapter = useMemo(() => {
    return fakeChapters.find((chapter) => chapter.id === chapterId);
  }, [chapterId]);

  //get next chapter
  const nextChapter = useMemo(() => {
    //get index of current chapter
    const index = topic.chapterIds.findIndex((id) => id === chapterId);
    if (index === -1 || index === topic.chapterIds.length) return null;

    const nextChapterId = topic.chapterIds[index + 1];
    return fakeChapters.find((chapter) => chapter.id === nextChapterId);
  }, [chapterId, topic.chapterIds]);

  //check if user has purchased course
  const purchase = fakePurchases.find(
    (purchase) => purchase.courseId === courseId && purchase.userId === "1"
  );

  const { resources } = course!;
  const { videoUrl } = chapter!;
  const completeOnEnd = !!purchase && !chapter?.userProgress[0]?.isCompleted;
  const isLocked = !chapter?.isFree && !purchase;
  const isCompleted = !!chapter?.userProgress[0]?.isCompleted;
  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <>
      {isCompleted && (
        <Banner variant="success" className="top-[80px]">
          You have already completed this chapter
        </Banner>
      )}
      {isLocked && (
        <Banner variant="warning" className="top-[80px]">
          You need to purchase this course to watch this chapter
        </Banner>
      )}

      <div className="mx-auto max-w-5xl flex flex-col p-4">
        <ChapterVideoPlayer
          chapterId={chapterId}
          courseId={courseId}
          title={chapter ? chapter.title : ""}
          nextChapterId={nextChapter?.id}
          playbackUrl={videoUrl}
          isLocked={isLocked}
          completeOnEnd={completeOnEnd}
        />
        <div className="py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h2>{chapter?.title}</h2>
            {true ? (
              <Button
                className="w-full md:w-auto"
                variant={isCompleted ? "outline" : "success"}
              >
                {isCompleted ? "Not completed" : "Mark as complete"}
                <Icon size={16} className="ml-2" />
              </Button>
            ) : (
              <Button className="w-full md:w-auto">{`Enrol for ${displayNumber(
                course.price,
                "$"
              )}`}</Button>
            )}
          </div>
          <Separator className="my-4" />
          {chapter?.description && (
            <div>
              <Preview value={chapter?.description} />
            </div>
          )}

          {!!resources.length && (
            <>
              <Separator className="my-4" />
              <>
                {resources.map((resource, index) => (
                  <Link
                    key={index}
                    href={resource.cloudUrl}
                    target="_blank"
                    className="flex items-center gap-1 p-3 w-full bg-indigo-50 border text-indigo-950 rounded-md hover:underline"
                  >
                    <File size={16} />
                    <p className="line-clamp-1">{resource.data.name}</p>
                  </Link>
                ))}
              </>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
