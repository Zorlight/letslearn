"use client";
import { Input } from "@/lib/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import { FormProvider, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import ImageGuiding from "../form-guiding/image-guiding";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "@/models/user";
import { getMyInfo } from "@/services/user";
import { ChooseAvatarButton } from "../profile-tab/choose-avatar-button";

type ProfileForm = {
  email: string;
  username: string;
};

const schema: ZodType<ProfileForm> = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(6, { message: "Username must be at least 6 characters" }),
});

const initForm = {
  email: "",
  username: "",
};

export default function ProfileTab() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initForm,
  });
  const { register, watch, setValue, formState } = form;
  const { username, email } = watch();
  const { errors } = formState;

  const handleGetInfoSuccess = (data: User) => {
    setValue("username", data.username);
    setValue("email", data.email);
    setIsLoading(false);
  };
  const handleGetInfoFail = (err: any) => {
    toast.error(err);
  };
  useEffect(() => {
    setIsLoading(true);
    getMyInfo(handleGetInfoSuccess, handleGetInfoFail);
  }, []);

  const handleInputChange = (key: keyof ProfileForm) => (e: any) => {
    setValue(key, e.target.value);
  };
  const handleImageChanged = (file: File | null) => {
    setImageFile(file);
    const url = file ? URL.createObjectURL(file) : null;
    setImageUrl(url);
  };

  const onSubmit = (data: ProfileForm) => {};

  const usernameHtmlfor = nanoid();
  if (isLoading) return <div>Loading...</div>;
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row items-center gap-6"
      >
        <div className="w-full flex flex-col gap-4">
          <RowSetting label="Username" htmlFor={usernameHtmlfor}>
            <Input
              id={usernameHtmlfor}
              placeholder="Username"
              defaultValue={username !== "" ? username : undefined}
              {...register("username")}
              onChange={handleInputChange("username")}
            />
            {errors?.username && (
              <p className="absolute top-full text-red-500 text-xs font-semibold">
                {errors.username.message}
              </p>
            )}
          </RowSetting>
          <RowSetting label="Email">
            <Input
              placeholder="example@gmail.com"
              defaultValue={email !== "" ? email : undefined}
              disabled
            />
          </RowSetting>
        </div>
        <ChooseAvatarButton
          fileUrl={imageUrl}
          onImageChanged={handleImageChanged}
        />
        <ImageGuiding />
      </form>
    </FormProvider>
  );
}

interface RowProps {
  label: string;
  htmlFor?: string;
  children?: React.ReactNode[] | React.ReactNode;
}
const RowSetting = ({ label, children, htmlFor }: RowProps) => {
  return (
    <div className="w-full flex flex-row items-center gap-2">
      <label htmlFor={htmlFor} className="w-[100px] font-semibold">
        {label}
      </label>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
};
