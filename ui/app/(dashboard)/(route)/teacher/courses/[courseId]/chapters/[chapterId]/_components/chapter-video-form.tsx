"use client";
import { Button } from "@/lib/shadcn/button";
import FileUpload from "@/lib/cloudinary/file-upload";
import VideoDisplay from "@/lib/cloudinary/video-player";
import { cn } from "@/lib/utils";
import { Chapter } from "@/models/chapter";
import { AttachedFile } from "@/models/course";
import { CirclePlus, Paperclip } from "lucide-react";
import { useEffect, useState } from "react";
import defaultConfig from "@/lib/cloudinary/file-upload-config";

interface Props {
  data: Chapter;
  chapterId: string;
  onChange?: (course: Chapter) => void;
}

const ChapterVideoForm = ({ data, chapterId, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleUploadedFiles = (files: AttachedFile[]) => {
    setVideoUrl(files[0].cloudUrl);
    if (onChange) {
      onChange({ ...data, videoUrl: files[0].cloudUrl });
    }
    toggleEdit();
  };
  const toggleEdit = () => setIsEditing((prev) => !prev);
  useEffect(() => {
    setVideoUrl(data.videoUrl);
  }, [data.videoUrl]);

  return (
    <div className="w-full h-fit bg-indigo-50 rounded-md px-4 py-4 border space-y-2">
      <div className="flex flex-row items-center justify-between">
        <h5 className="font-semibold">Chapter video</h5>

        {isEditing ? (
          <Button
            variant="link"
            onClick={toggleEdit}
            className={cn("flex gap-2 h-fit p-0", !isEditing && "hidden")}
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="link"
            className={cn("h-fit p-0 space-x-1", isEditing && "hidden")}
            onClick={toggleEdit}
          >
            <CirclePlus size={14} />
            <span>Add video</span>
          </Button>
        )}
      </div>
      {isEditing ? (
        <FileUpload
          description="Video (100GB)"
          onUploaded={handleUploadedFiles}
          config={{ ...defaultConfig, multiple: false }}
        />
      ) : (
        <>
          <p
            className={cn(
              "text-slate-600 text-sm italic",
              videoUrl && videoUrl?.length > 0 && "hidden"
            )}
          >
            No file attached
          </p>
          <div
            className={cn(
              "flex flex-col w-full gap-1",
              !videoUrl || (videoUrl.length === 0 && "hidden")
            )}
          >
            <VideoDisplay videoUrl={videoUrl} />
          </div>
        </>
      )}
    </div>
  );
};

export default ChapterVideoForm;
