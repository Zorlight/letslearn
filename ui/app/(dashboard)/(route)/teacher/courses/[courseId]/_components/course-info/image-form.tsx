"use client";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { Label } from "@/lib/shadcn/label";
import { UploadFile } from "@/lib/cloudinary/cloudinary-handler";
import ImageDisplay from "@/lib/cloudinary/image-display";
import { cn } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { getFileInput, resetFileInput } from "../../_lib/utils";
import { Course } from "@/models/course";

interface Props {
  data: Course;
  courseId: string;
  onChange?: (course: Course) => void;
}

const ImageForm = ({ data, courseId, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(data.imageUrl);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = () => {
    const file = getFileInput(inputRef);
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };
  const handleCancel = () => {
    setImageUrl(data.imageUrl);
    setImageFile(null);
    resetFileInput(inputRef);
  };
  const handleSubmit = async () => {
    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    const res = await UploadFile(formData).finally(() => setIsUploading(false));
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      setImageFile(null);
      resetFileInput(inputRef);
      if (onChange) onChange({ ...data, imageUrl: res.data.secure_url });
    }
  };

  return (
    <div className="w-full h-fit bg-indigo-50 rounded-md px-4 py-4 border space-y-2">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold">Course Image</h1>

        <Button
          variant="link"
          onClick={handleCancel}
          className={cn("flex gap-2 h-fit p-0", !imageFile && "hidden")}
        >
          Cancel
        </Button>
        <Button
          variant="link"
          className={cn("h-fit p-0", imageFile && "hidden")}
        >
          <Label
            htmlFor="course-image-input"
            className="flex gap-2 cursor-pointer p-0"
          >
            <CirclePlus size={14} />
            Add image
          </Label>
        </Button>
        <Input
          ref={inputRef}
          id="course-image-input"
          type="file"
          className="hidden"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-2">
        <ImageDisplay imageUrl={imageUrl} />
        <Button
          disabled={!imageFile}
          variant="default"
          size="sm"
          className={cn("w-fit self-start", !imageFile && "hidden")}
          onClick={handleSubmit}
        >
          {isUploading ? "Uploading..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default ImageForm;
