"use client";
import { Input } from "@/lib/shadcn/input";
import { nanoid } from "@reduxjs/toolkit";
import { useFormContext } from "react-hook-form";
import { FileSettingForm } from "../setting-list";
import { CloudinaryFile } from "@/models/cloudinary-file";
import FileUpload from "@/lib/cloudinary/cloudinary-file-upload";
import { cn } from "@/lib/utils";
import FileUploadProgress from "@/lib/cloudinary/file-upload-progress";
import { useEffect, useState } from "react";
import { getFile } from "@/services/cloudinary";
import { toast } from "react-toastify";

export type GeneralSettingForm = {
  title: string;
  file: CloudinaryFile | null;
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
  const form = useFormContext<FileSettingForm>();
  const { register } = form;
  const {
    errors: { generalSettingForm: errors },
  } = form.formState;
  const { title, description, file } = formData;
  const [fileData, setFileData] = useState<File | null>(null);

  const handleSettingChange = (data: GeneralSettingForm) => {
    if (onChange) onChange(data);
  };
  const handleInputChange = (key: keyof GeneralSettingForm, data: string) => {
    handleSettingChange({ ...formData, [key]: data });
  };
  const handleFileUpload = (files: CloudinaryFile[]) => {
    handleSettingChange({ ...formData, file: files[0] });
  };

  const handleGetFileSuccess = (file: File) => {
    console.log(file);
    setFileData(file);
  };
  const handleGetFileFail = (err?: string) => {
    toast.error(err);
  };
  useEffect(() => {
    if (!file) return;
    getFile(
      file.displayUrl,
      handleGetFileSuccess,
      handleGetFileFail,
      file.name
    );
  }, [file]);

  const nameHtmlfor = nanoid();
  const descriptionHtmlfor = nanoid();

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
      <RowSetting title="File upload" className="items-start">
        {!file && (
          <FileUpload
            config={{
              multiple: false,
            }}
            onUploaded={handleFileUpload}
          />
        )}

        {fileData && (
          <div className="w-full h-fit rounded-md overflow-hidden border flex flex-col items-center justify-center gap-4 p-4">
            <FileUploadProgress files={[fileData]} />
          </div>
        )}
        {errors?.file && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.file.message}
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
