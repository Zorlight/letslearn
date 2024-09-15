import { LoadingCircle } from "@/components/icons/loading-circle";
import VideoPlayer from "@/lib/cloudinary/video-player";
import { Lock } from "lucide-react";
import React from "react";

interface Props {
  chapterId: string;
  courseId: string;
  title: string;
  nextChapterId: string | undefined;
  playbackUrl: string | null;
  isLocked: boolean;
  completeOnEnd: boolean;
}
const ChapterVideoPlayer = ({
  chapterId,
  courseId,
  title,
  nextChapterId,
  playbackUrl,
  isLocked,
  completeOnEnd,
}: Props) => {
  return (
    <div className="relative aspect-video">
      {/* <VideoPlayer videoUrl={videoUrl} /> */}
      {!isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-indigo-950">
          <LoadingCircle color="white" size={52} />
          <p className="text-red-500 text-lg">Todo: Video player here</p>
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex flex-row items-center justify-center gap-2 bg-indigo-950 text-white">
          <Lock size={16} />
          <p>This chapter is locked</p>
        </div>
      )}
    </div>
  );
};

export default ChapterVideoPlayer;
