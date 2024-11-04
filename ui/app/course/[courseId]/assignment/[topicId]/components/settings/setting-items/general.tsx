"use client";
import { Input } from "@/lib/shadcn/input";
import TinyEditor from "@/lib/tinymce/editor";
import { useFormContext } from "react-hook-form";
import { AssignmentSettingForm } from "../setting-list";
import { nanoid } from "@reduxjs/toolkit";

export type GeneralSettingForm = {
  name: string;
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
  const form = useFormContext<AssignmentSettingForm>();
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

  const generalSettingNameHtmlfor = nanoid();

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSetting title="Assigment name" htmlFor={generalSettingNameHtmlfor}>
        <Input
          id={generalSettingNameHtmlfor}
          className="flex-1 focus:outline-none"
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
      <RowSetting title="Description">
        <TinyEditor
          onChange={(data) => handleEditorChange("description", data)}
          initValue={description}
        />
      </RowSetting>
    </div>
  );
}

interface RowProps {
  title: string;
  htmlFor?: string;
  children?: React.ReactNode[] | React.ReactNode;
}
const RowSetting = ({ title, children, htmlFor }: RowProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <label htmlFor={htmlFor} className="w-[180px] font-semibold">
        {title}
      </label>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
};
