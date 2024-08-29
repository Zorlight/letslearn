"use client";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { Chapter } from "@/models/chapter";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import ChapterList from "./chapter-list";
import { DropResult } from "@hello-pangea/dnd";
import { nanoid } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";

interface Props {
  data: Chapter[];
  courseId: string;
}

type FormProps = {
  title: string;
};
const schema: ZodType<FormProps> = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const ChapterForm = ({ data, courseId }: Props) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>(data);
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
  });
  const { register, handleSubmit, setValue, watch } = form;
  const { errors, isValid, isSubmitting } = form.formState;

  const toggleEdit = () => setIsEditing(!isEditing);
  const resetForm = () => {
    setValue("title", "");
  };
  const handleCancel = () => {
    resetForm();
    toggleEdit();
  };
  const handleEdit = (chapter: Chapter) => {
    router.push(`/teacher/courses/${courseId}/chapters/${chapter.id}`);
  };
  const handleReordered = (chapters: Chapter[]) => {
    setChapters(chapters);
  };

  const onSubmit = (form: FormProps) => {
    //Create new chapter
    const newChapter: Chapter = {
      id: nanoid(),
      title: form.title,
      description: "",
      videoUrl: "",
      isFree: false,
      isPublished: true,
      position: chapters.length + 1,
    };

    const updatedChapters = [...chapters, newChapter];
    setChapters(updatedChapters);

    //Reset form
    resetForm();
    toggleEdit();
  };

  useEffect(() => {
    setIsEditing(false);

    return () => {
      resetForm();
    };
  }, []);

  return (
    <div className="h-fit bg-indigo-50 rounded-md px-4 py-4 border space-y-2">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold">Course chapter</h1>

        {isEditing ? (
          <Button
            variant="link"
            className="flex gap-2 h-fit p-0"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="link"
            className="flex gap-2 h-fit p-0"
            onClick={toggleEdit}
          >
            <CirclePlus size={14} />
            Add a chapter
          </Button>
        )}
      </div>
      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <Input
            id="chapter"
            aria-label="chapter"
            className="flex-1 focus:outline-none"
            placeholder="e.g. Introduction to Programming"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-xs font-semibold">
              {errors.title.message}
            </p>
          )}
          <Button
            disabled={!isValid}
            variant="default"
            size="sm"
            className="w-fit"
          >
            Save
          </Button>
        </form>
      ) : (
        <ChapterList
          data={chapters}
          onEdit={handleEdit}
          onReordered={handleReordered}
        />
      )}
    </div>
  );
};

export default ChapterForm;
