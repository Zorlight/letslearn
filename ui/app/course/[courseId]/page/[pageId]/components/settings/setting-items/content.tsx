"use client";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { ChevronsUpDown } from "lucide-react";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { PageSettingForm } from "../setting-list";
import TinyEditor from "@/lib/tinymce/editor";
import { cn } from "@/lib/utils";

export type ContentSettingForm = {
  content: string;
};

interface Props {
  formData: ContentSettingForm;
  onChange?: (data: ContentSettingForm) => void;
}

const ContentSetting = ({ formData, onChange }: Props) => {
  const form = useFormContext<PageSettingForm>();
  const { register } = form;
  const {
    errors: { contentSettingForm: errors },
  } = form.formState;
  const { content } = formData;
  const handleSettingChange = (data: ContentSettingForm) => {
    if (onChange) onChange(data);
  };

  const handleEditorChange = (key: keyof ContentSettingForm, data: any) => {
    handleSettingChange({ ...formData, [key]: data });
  };

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSetting title="Content" className="items-start">
        <TinyEditor
          onChange={(data) => handleEditorChange("content", data)}
          initValue={content}
        />
      </RowSetting>
    </div>
  );
};

interface RowProps {
  title: string;
  htmlFor?: string;
  children?: React.ReactNode[] | React.ReactNode;
  className?: string;
}
const RowSetting = ({ title, children, htmlFor, className }: RowProps) => {
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      <label htmlFor={htmlFor} className="w-[180px] font-semibold">
        {title}
      </label>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
};

export default ContentSetting;
