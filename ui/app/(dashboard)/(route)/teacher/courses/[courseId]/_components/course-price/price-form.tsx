"use client";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { cn } from "@/lib/utils";
import { Course } from "@/models/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

interface Props {
  data: Course;
  courseId: string;
  onChange?: (course: Course) => void;
}

type FormProps = {
  price: number;
};
const schema: ZodType<FormProps> = z.object({
  price: z
    .number({ message: "Price is required" })
    .min(0.01, { message: "Price must be greater than 0" }),
});

const PriceForm = ({ data, courseId, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      price: data.price ?? undefined,
    },
  });
  const { setValue, watch, register, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = form.formState;
  const onSubmit = (form: FormProps) => {
    console.log(form);
    //Logic to update course price

    if (onChange) onChange({ ...data, price: form.price });
    toggleEdit();
  };
  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="h-fit bg-indigo-50 rounded-md px-4 py-4 border space-y-2">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold">Course Price</h1>

        {isEditing ? (
          <Button
            variant="link"
            className="flex gap-2 h-fit p-0"
            onClick={toggleEdit}
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
            Edit price
          </Button>
        )}
      </div>
      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <Input
            id="price"
            aria-label="price"
            className="flex-1 focus:outline-none"
            placeholder="e.g. 1.99"
            type="number"
            step={0.01}
            min={0}
            max={999999999}
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-500 text-xs font-semibold">
              {errors.price.message}
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
        //what is the default value for data?
        <p className={cn("text-sm text-slate-600", !data && "italic")}>
          {data.price || "No price"}
        </p>
      )}
    </div>
  );
};

export default PriceForm;
