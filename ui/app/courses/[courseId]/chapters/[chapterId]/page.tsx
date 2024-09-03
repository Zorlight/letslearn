import React, { useMemo } from "react";
import { course, purchases } from "./_components/fake-data";
import Banner from "@/components/ui/banner";
import VideoPlayer from "@/lib/cloudinary/video-player";
import ChapterVideoPlayer from "./_components/chapter-video-display";
import { Button } from "@/lib/shadcn/button";
import { displayNumber } from "@/lib/utils";
import { Separator } from "@/lib/shadcn/separator";
import Preview from "@/lib/react-quill/preview";
import Link from "next/link";
import { CheckCircle, File, XCircle } from "lucide-react";

interface Props {
  params: {
    courseId: string;
    chapterId: string;
  };
}
const ChapterIdPage = ({ params }: Props) => {
  const { courseId, chapterId } = params;
  const { chapters, resources } = course;

  //check if user has purchased course
  const purchase = purchases.find(
    (purchase) => purchase.courseId === courseId && purchase.userId === "1"
  );

  //get chapter by id
  const chapter = useMemo(() => {
    return chapters.find((chapter) => chapter.id === chapterId);
  }, [chapters, chapterId]);

  //get next chapter
  const nextChapter = useMemo(() => {
    return chapters.find((nextChapter) => nextChapter.id === chapter?.id);
  }, [chapters, chapter]);

  const { videoUrl } = chapter!;
  const completeOnEnd = !!purchase && !chapter?.userProgress[0]?.isCompleted;
  const isLocked = !chapter?.isFree && !purchase;
  const isCompleted = !!chapter?.userProgress[0]?.isCompleted;
  const Icon = isCompleted ? XCircle : CheckCircle;
  return (
    <div className="relative w-full h-full">
      <div className="sticky top-[80px] w-full z-50">
        {isCompleted && (
          <Banner
            label="You have already completed this chapter"
            variant="success"
          />
        )}
        {isLocked && (
          <Banner
            label="You need to purchase this course to watch this chapter"
            variant="warning"
          />
        )}
      </div>

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
    </div>
  );
};

export default ChapterIdPage;
