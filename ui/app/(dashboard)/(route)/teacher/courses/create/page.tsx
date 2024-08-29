"use client";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z, ZodType } from "zod";

type CourseForm = {
  title: string;
};
const schema: ZodType<CourseForm> = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const CreateCoursePage = () => {
  const router = useRouter();
  const form = useForm<CourseForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });
  const { register, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = form.formState;
  const onSubmit = (data: CourseForm) => {
    fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Course created successfully");
          router.push("/teacher/courses");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="max-w-xl mx-auto h-full flex flex-col gap-4 p-6">
      <div>
        <h1 className="text-3xl">Name your course</h1>
        <p className="text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change it later.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-semibold">
            Course Title
          </label>
          <Input
            id="title"
            aria-label="title"
            className="flex-1focus:outline-none"
            placeholder=".e.g Introduction to Programming"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-xs font-semibold">
              {errors.title.message}
            </p>
          )}
          <p className="text-slate-600 text-sm">
            What will you teach in this course.
          </p>
        </div>

        <div className="flex flex-row gap-2">
          <Link href="/teacher/courses">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button disabled={!isValid} type="submit" variant="default">
            {isSubmitting ? "Submitting..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCoursePage;
