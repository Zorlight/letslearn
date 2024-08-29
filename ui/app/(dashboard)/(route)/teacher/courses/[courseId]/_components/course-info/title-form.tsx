"use client";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { Course } from "@/models/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { title } from "process";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

interface Props {
  data: Course;
  courseId: string;
  onChange?: (course: Course) => void;
}

type FormProps = {
  title: string;
};
const schema: ZodType<FormProps> = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const TitleForm = ({ data, courseId, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data.title,
    },
  });
  const { register, handleSubmit, reset } = form;
  const { errors, isValid, isSubmitting } = form.formState;
  const onSubmit = (form: FormProps) => {
    //Logic to update course title

    if (onChange) onChange({ ...data, title: form.title });
    toggleEdit();
  };
  const toggleEdit = () => setIsEditing(!isEditing);
  const resetForm = () => {
    reset({ title: data.title });
  };
  const handleCancel = () => {
    resetForm();
    toggleEdit();
  };
  return (
    <div className="h-fit bg-indigo-50 rounded-md px-4 py-4 border">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold">Course Title</h1>

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
            Edit title
          </Button>
        )}
      </div>
      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <Input
            id="title"
            aria-label="title"
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
        <p className="text-sm text-slate-600">{data.title}</p>
      )}
    </div>
  );
};

export default TitleForm;
