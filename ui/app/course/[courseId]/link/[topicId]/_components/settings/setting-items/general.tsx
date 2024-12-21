"use client";
import { Input } from "@/lib/shadcn/input";
import { cn } from "@/lib/utils";
import { nanoid } from "@reduxjs/toolkit";
import { useFormContext } from "react-hook-form";
import { LinkSettingForm } from "../setting-list";

export type GeneralSettingForm = {
  title: string;
  url: string | null;
  description: string;
};

interface GeneralSettingProps {
  formData: GeneralSettingForm;
  onChange?: (data: GeneralSettingForm) => void;
}

export default function GeneralSetting({
  formData,
  onChange,
}: GeneralSettingProps) {
  const form = useFormContext<LinkSettingForm>();
  const { register } = form;
  const {
    errors: { generalSettingForm: errors },
  } = form.formState;
  const { title, description, url } = formData;

  const handleSettingChange = (data: GeneralSettingForm) => {
    if (onChange) onChange(data);
  };
  const handleInputChange = (key: keyof GeneralSettingForm, data: string) => {
    handleSettingChange({ ...formData, [key]: data });
  };

  const nameHtmlfor = nanoid();
  const descriptionHtmlfor = nanoid();
  const urlHtmlfor = nanoid();

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSetting title="Name" htmlFor={nameHtmlfor}>
        <Input
          id={nameHtmlfor}
          placeholder="Enter a name"
          defaultValue={title !== "" ? title : undefined}
          {...register("generalSettingForm.title")}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
        {errors?.title && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.title.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="External URL" htmlFor={urlHtmlfor}>
        <Input
          placeholder="URL here"
          defaultValue={url || ""}
          {...register("generalSettingForm.url")}
          onChange={(e) => handleInputChange("url", e.target.value)}
        />
        {errors?.url && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.url.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="Decription" htmlFor={descriptionHtmlfor}>
        <Input
          id={descriptionHtmlfor}
          placeholder="Decription for the file"
          defaultValue={description !== "" ? description : undefined}
          {...register("generalSettingForm.description")}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
        {errors?.description && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.description.message}
          </p>
        )}
      </RowSetting>
    </div>
  );
}

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
