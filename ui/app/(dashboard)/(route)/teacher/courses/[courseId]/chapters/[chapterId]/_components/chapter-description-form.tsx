"use client";

import { Button } from "@/lib/shadcn/button";
import Editor from "@/lib/react-quill/editor";
import Preview from "@/lib/react-quill/preview";
import { Chapter } from "@/models/chapter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

interface Props {
  data: Chapter;
  chapterId: string;
  onChange?: (chapter: Chapter) => void;
}

type FormProps = {
  description: string;
};
const schema: ZodType<FormProps> = z.object({
  description: z.string().min(1, { message: "Description is required" }),
});

const ChapterDescriptionForm = ({ data, chapterId, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: data.description || undefined,
    },
  });
  const { watch, setValue, handleSubmit, reset } = form;
  const { errors } = form.formState;
  const onSubmit = (form: FormProps) => {
    //Logic to update course description

    if (onChange) onChange({ ...data, description: form.description });
    toggleEdit();
  };
  const toggleEdit = () => setIsEditing(!isEditing);
  const handleCancel = () => {
    resetForm();
    toggleEdit();
  };

  const resetForm = () => {
    setIsEditing(false);
    reset({ description: data.description || "" });
  };

  const handleTextChange = (htmlText: string) => {
    setValue("description", htmlText);
  };

  const extractTextContent = (htmlString: string | undefined) => {
    if (!htmlString) return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || null;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="h-fit bg-indigo-50 rounded-md px-4 py-4 border space-y-2">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold">Chapter description</h1>

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
            <Pen size={14} />
            Edit description
          </Button>
        )}
      </div>
      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <Editor
            className="flex-1 focus:outline-none"
            value={watch("description")}
            onChange={handleTextChange}
          />
          {errors.description && (
            <p className="text-red-500 text-xs font-semibold">
              {errors.description.message}
            </p>
          )}
          <Button
            disabled={watch("description") === data.description}
            variant="default"
            size="sm"
            className="w-fit"
          >
            Save
          </Button>
        </form>
      ) : (
        <>
          {extractTextContent(watch("description")) ? (
            <div>
              <p className="text-indigo-700 text-sm font-medium p-0">
                Preview:
              </p>
              <Preview className="text-sm" value={watch("description")} />
            </div>
          ) : (
            <p className="text-sm text-slate-600 italic">No description</p>
          )}
        </>
      )}
    </div>
  );
};

export default ChapterDescriptionForm;
