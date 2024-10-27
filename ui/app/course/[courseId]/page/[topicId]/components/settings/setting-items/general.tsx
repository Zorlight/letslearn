"use client";
import { Input } from "@/lib/shadcn/input";
import TinyEditor from "@/lib/tinymce/editor";
import { nanoid } from "@reduxjs/toolkit";
import { useFormContext } from "react-hook-form";
import { PageSettingForm } from "../setting-list";
import { cn } from "@/lib/utils";

export type GeneralSettingForm = {
  name: string;
  description: string;
};

interface GeneralSettingProps {
  formData: GeneralSettingForm;
  onChange?: (data: GeneralSettingForm) => void;
}

const GeneralSetting = ({ formData, onChange }: GeneralSettingProps) => {
  const form = useFormContext<PageSettingForm>();
  const { register } = form;
  const {
    errors: { generalSettingForm: errors },
  } = form.formState;
  const { name, description } = formData;

  const handleSettingChange = (data: GeneralSettingForm) => {
    if (onChange) onChange(data);
  };
  const handleInputChange = (key: keyof GeneralSettingForm, data: string) => {
    handleSettingChange({ ...formData, [key]: data });
  };
  const handleEditorChange = (key: keyof GeneralSettingForm, data: any) => {
    handleSettingChange({ ...formData, [key]: data });
  };
  const pageNameHtmlfor = nanoid();

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSetting title="Name" htmlFor={pageNameHtmlfor}>
        <Input
          id={pageNameHtmlfor}
          placeholder="Enter a name"
          defaultValue={name !== "" ? name : undefined}
          {...register("generalSettingForm.name")}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        {errors?.name && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.name.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="Description" className="items-start">
        <TinyEditor
          onChange={(data) => handleEditorChange("description", data)}
          initValue={description}
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

export default GeneralSetting;
