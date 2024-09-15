"use client";

import { Button } from "@/lib/shadcn/button";
import { Checkbox } from "@/lib/shadcn/checkbox";
import { Chapter } from "@/models/chapter";
import { Pen } from "lucide-react";
import { useState } from "react";

interface Props {
  data: Chapter;
  chapterId: string;
  onChange?: (chapter: Chapter) => void;
}

const ChapterAccessForm = ({ data, chapterId, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFree, setIsFree] = useState(data.isFree);

  const onSubmit = () => {
    //Logic to update course isFree

    if (onChange) onChange({ ...data, isFree });
    toggleEdit();
  };
  const toggleEdit = () => setIsEditing(!isEditing);
  const handleCancel = () => {
    setIsFree(data.isFree);
    toggleEdit();
  };

  return (
    <div className="h-fit bg-indigo-50 rounded-md px-4 py-4 border space-y-2">
      <div className="flex flex-row items-center justify-between">
        <h5 className="font-semibold">Chapter access setting</h5>

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
            Edit access
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isFree}
              onCheckedChange={(checked) => setIsFree(!!checked)}
            />
            <span className="text-sm text-slate-600">
              Check this box if you want this chapter be free for preview.
            </span>
          </div>
          <Button
            disabled={isFree === data.isFree}
            variant="default"
            size="sm"
            className="w-fit"
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
      ) : (
        <>
          {data.isFree ? (
            <p className="text-sm text-slate-600">
              This chapter is free for preview.
            </p>
          ) : (
            <p className="text-sm text-slate-600 italic">
              This chapter is not free.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ChapterAccessForm;
