"use client";
import { Button } from "@/lib/shadcn/button";
import { Textarea } from "@/lib/shadcn/textarea";
import { cn } from "@/lib/utils";
import { Course } from "@/models/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

interface Props {
  data: Course;
  courseId: string;
  onChange?: (data: Course) => void;
}

type FormProps = {
  description: string;
};
const schema: ZodType<FormProps> = z.object({
  description: z.string().min(1, { message: "Description is required" }),
});

const DiscriptionForm = ({ data, courseId, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: data.description || "",
    },
  });
  const { register, handleSubmit, reset } = form;
  const { errors, isValid, isSubmitting } = form.formState;
  const onSubmit = (form: FormProps) => {
    console.log(form);
    //Logic to update course title

    if (onChange) onChange({ ...data, description: form.description });
    toggleEdit();
  };
  const toggleEdit = () => setIsEditing(!isEditing);
  const resetForm = () => {
    setIsEditing(false);
    reset({ description: data.description || "" });
  };
  const handleCancel = () => {
    resetForm();
    toggleEdit();
  };

  return (
    <div className="h-fit bg-indigo-50 rounded-md px-4 py-4 border space-y-2">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold">Course Description</h1>

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
          <Textarea
            id="description"
            aria-label="description"
            className="flex-1 focus:outline-none"
            placeholder="e.g. This is an introductory course to computer science"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-xs font-semibold">
              {errors.description.message}
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
        <p className={cn("text-sm text-slate-600", !data && "italic")}>
          {data.description || "No description"}
        </p>
      )}
    </div>
  );
};

export default DiscriptionForm;
