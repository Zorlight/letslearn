"use client";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { getFileExtension, isImageExtension } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import ImageGuiding, { ImageRequirement } from "../form-guiding/image-guiding";
import { ChooseAvatarButton } from "../profile-tab/choose-avatar-button";
import { updateProfile } from "@/services/user";
import { User } from "@/models/user";
import { toast } from "react-toastify";
import { deleteFile, uploadFile } from "@/services/cloudinary";
import { setProfile } from "@/redux/slices/profile";
import { Spinner } from "@nextui-org/spinner";

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
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const user = useAppSelector((state) => state.profile.value);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initForm,
  });
  const requirements: ImageRequirement = useMemo(() => {
    if (!imageFile) return {};
    const extension = getFileExtension(imageFile.name);
    return {
      size: imageFile.size <= 2 * 1024 * 1024,
      extension: isImageExtension(extension),
    };
  }, [imageFile]);
  const { register, watch, setValue, formState } = form;
  const { username, email } = watch();
  const { errors } = formState;

  const setInitValue = (user: User) => {
    setValue("username", user.username);
    setValue("email", user.email);
    setImageUrl(user.avatar);
  };
  useEffect(() => {
    if (!user) return;
    setInitValue(user);
  }, [user]);

  const handleInputChange = (key: keyof ProfileForm) => (e: any) => {
    setValue(key, e.target.value);
  };
  const handleImageChanged = (file: File | null) => {
    setImageFile(file);
    const url = file ? URL.createObjectURL(file) : null;
    setImageUrl(url);
  };

  const handleUpdateSuccess = (user: User) => {
    toast.success("Profile updated successfully");
    dispatch(setProfile(user));
    setIsLoading(false);
  };
  const handleFail = (error: any) => {
    toast.error(error);
  };

  const handleUploadFileSuccess = (data: any) => {
    updateProfile(username, data.secure_url, handleUpdateSuccess, handleFail);
  };

  const handleUploadAvatar = (file: File) => {
    if (user?.avatar) deleteFile(user?.avatar, () => {}, handleFail);
    uploadFile(file, handleUploadFileSuccess, handleFail);
  };

  const onSubmit = (data: ProfileForm) => {
    if (!isDataChanged) return;
    setIsLoading(true);
    if (imageFile) handleUploadAvatar(imageFile);
    else {
      updateProfile(
        data.username,
        imageUrl || "",
        handleUpdateSuccess,
        handleFail
      );
    }
  };

  useEffect(() => {
    console.log("imageUrl", imageUrl);
    console.log("user.avatar", user?.avatar);
    console.log("is dif", imageUrl !== user?.avatar);
    console.log("is data changed", isDataChanged);
  }, [imageUrl]);
  const isDataChanged = useMemo(() => {
    if (!user) return false;
    return (
      username !== user.username ||
      imageFile !== null ||
      imageUrl !== user.avatar
    );
  }, [username, imageFile, imageUrl, user]);
  const usernameHtmlfor = nanoid();
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-row items-center gap-6">
          <div className="w-full flex flex-col gap-5">
            <SettingRow label="Username" htmlFor={usernameHtmlfor}>
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
            </SettingRow>
            <SettingRow label="Email">
              <Input
                placeholder="example@gmail.com"
                defaultValue={email !== "" ? email : undefined}
                disabled
              />
            </SettingRow>
          </div>
          <ChooseAvatarButton
            fileUrl={imageUrl}
            onImageChanged={handleImageChanged}
          />
          <ImageGuiding requirements={requirements} />
        </div>
        <Button
          disabled={!isDataChanged}
          className="w-[120px] bg-blue-50 text-blue-700 border-[0.5px] border-blue-700 font-bold rounded-lg hover:bg-blue-100 hover:text-blue-800"
        >
          {isLoading ? <Spinner color="primary" size="sm" /> : "Save profile"}
        </Button>
      </form>
    </FormProvider>
  );
}

interface SettingRowProps {
  label: string;
  htmlFor?: string;
  children?: React.ReactNode[] | React.ReactNode;
}
const SettingRow = ({ label, htmlFor, children }: SettingRowProps) => {
  return (
    <div className="w-full flex flex-row items-center gap-2">
      <label htmlFor={htmlFor} className="w-[100px] font-bold text-sm">
        {label}
      </label>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
};
