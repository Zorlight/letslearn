"use client";
import { LoadingCircle } from "@/components/icons/loading-circle";
import { ClassValue } from "clsx";
import { Video } from "lucide-react";
import { CldVideoPlayer, getCldVideoUrl } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { useEffect, useRef, useState } from "react";
import { getPublicIdFromCloudinaryUrl } from "./utils";
import { cn } from "../utils";

interface Props {
  videoUrl: string | null | undefined;
  className?: ClassValue;
  tooltip?: string;
}
const VideoPlayer = ({ videoUrl, className, tooltip }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [firstPlay, setFirstPlay] = useState(true);
  const videoPublicId = videoUrl
    ? getPublicIdFromCloudinaryUrl(videoUrl)
    : undefined;

  return (
    <div className={cn("w-full h-full", className)}>
      {videoPublicId ? (
        <>
          <div
            className={cn(
              "bg-black w-full h-full aspect-video flex items-center justify-center rounded-md",
              loaded && "hidden"
            )}
          >
            <LoadingCircle size={40} color="#ffffff" />
          </div>
          <p className={cn("mt-2 text-sm text-slate-600", loaded && "hidden")}>
            Video can take a few minutes to process. Refresh the page if video
            does not appear.
          </p>
          <div className={cn(!loaded && "hidden")}>
            {/* src is the public id of the video */}
            <CldVideoPlayer
              onMetadataLoad={() => {
                setLoaded(true);
              }}
              onEnded={() => setFirstPlay(false)}
              width={1920}
              height={1080}
              src={videoPublicId}
              className="w-full h-full aspect-video rounded-md"
              colors={{
                base: "#1e1b4f",
                text: "#ffffff",
                accent: "#4338ca",
              }}
            />
            <p
              className={cn(
                "mt-2 text-sm text-slate-600",
                !firstPlay && "text-green-600"
              )}
            >
              {firstPlay
                ? "Video will take the first time to load all the data. Feel free to preview the video."
                : "Loaded successfully. Video is now ready to play smoothly."}
            </p>
          </div>
        </>
      ) : (
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <Video size={32} className="text-slate-600" />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
