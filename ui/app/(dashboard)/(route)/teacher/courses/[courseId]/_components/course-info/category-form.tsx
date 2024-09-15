"use client";
import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Pen } from "lucide-react";
import { useState } from "react";
import { Category, Course } from "@/models/course";
import { Combobox } from "@/components/ui/combobox";
import { fakeCategories } from "@/fake-data/category";
import { categories } from "../static-data";

interface Props {
  data: Course;
  courseId: string;
  onChange?: (course: Course) => void;
}

const CategoryForm = ({ data, courseId, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(data.categoryId);
  const handleOptionChange = (value: string) => {
    setCategoryId(value);
  };
  const onSubmit = () => {
    console.log(data);
    //Logic to update course title

    if (onChange) onChange({ ...data, categoryId });
    toggleEdit();
  };
  const toggleEdit = () => setIsEditing(!isEditing);
  const handleCancel = () => {
    setCategoryId(data.categoryId);
    toggleEdit();
  };
  const category = fakeCategories.find(
    (category) => category.id === categoryId
  );
  return (
    <div className="h-fit bg-indigo-50 rounded-md px-4 py-4 border space-y-2">
      <div className="flex flex-row items-center justify-between">
        <h5 className="font-semibold">Course Category</h5>

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
            Edit category
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="w-full flex flex-col gap-2">
          <Combobox
            name="Category"
            options={categories}
            onChange={handleOptionChange}
          >
            <Button variant="outline" className="w-full justify-between">
              {category ? category.name : "Select category..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </Combobox>
          <Button
            // disabled={!isValid}
            variant="default"
            size="sm"
            className="w-fit"
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
      ) : (
        <p className={cn("text-sm text-slate-600", !data && "italic")}>
          {category ? category.name : "No category"}
        </p>
      )}
    </div>
  );
};

export default CategoryForm;
