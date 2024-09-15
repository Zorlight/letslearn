"use client";
import { Button } from "@/lib/shadcn/button";
import FileUpload from "@/lib/cloudinary/file-upload";
import MiniFile from "@/lib/cloudinary/mini-file";
import { cn } from "@/lib/utils";
import { AttachedFile, Course } from "@/models/course";
import { Paperclip } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  data: Course;
  courseId: string;
  onChange?: (course: Course) => void;
}

const AttachmentForm = ({ data, courseId, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);

  const handleUploadedFiles = (files: AttachedFile[]) => {
    setAttachedFiles((prev) => [...prev, ...files]);
    if (onChange) onChange({ ...data, resources: attachedFiles });
    toggleEdit();
  };
  const toggleEdit = () => setIsEditing((prev) => !prev);

  useEffect(() => {
    setAttachedFiles(data.resources);
  }, [data.resources]);

  return (
    <div className="w-full h-fit bg-indigo-50 rounded-md px-4 py-4 border space-y-2">
      <div className="flex flex-row items-center justify-between">
        <h5 className="font-semibold">Course Resourses</h5>

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
            <Paperclip size={14} />
            <span>Attach files</span>
          </Button>
        )}
      </div>
      {isEditing ? (
        <FileUpload onUploaded={handleUploadedFiles} />
      ) : (
        <>
          <p
            className={cn(
              "text-slate-600 text-sm italic",
              attachedFiles.length > 0 && "hidden"
            )}
          >
            No file attached
          </p>
          <div
            className={cn(
              "flex flex-col w-full gap-1",
              attachedFiles.length === 0 && "hidden"
            )}
          >
            {attachedFiles.map((file, index) => (
              <MiniFile
                key={index}
                file={file}
                onDeleted={() => {
                  setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AttachmentForm;
