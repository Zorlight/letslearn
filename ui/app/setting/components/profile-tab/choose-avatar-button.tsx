"use client";
import { cn } from "@/lib/utils";
import { nanoid } from "@reduxjs/toolkit";
import { ClassValue } from "clsx";
import { Camera, ImageMinus } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";

interface Props {
  className?: ClassValue;
  fileUrl: string | null;
  onImageChanged?: (file: File | null) => void;
}
export const ChooseAvatarButton = ({
  className,
  fileUrl,
  onImageChanged,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file || file.size > 2000000) {
      toast.error("Image size should be less than 2MB");
      return;
    }
    if (onImageChanged) onImageChanged(file);
    e.target.value = "";
  };
  const handleRemoveImage = (e: any) => {
    e.preventDefault();
    if (onImageChanged) onImageChanged(null);
  };

  const inputHtmlFor = nanoid();

  return (
    <div
      className={cn(
        "w-[100px] h-[100px] relative border-0 outline-none select-none shrink-0 flex items-center justify-center rounded-full shadow-md overflow-hidden",
        className
      )}
    >
      <label
        htmlFor={inputHtmlFor}
        className="absolute flex flex-row items-center justify-center w-full h-full cursor-pointer bg-gray-200/60 text-white opacity-0 hover:opacity-100 ease-linear duration-100"
      >
        <div
          className={cn(
            "h-full w-1/2 flex items-center justify-center hover:bg-gray-200/20 ease-linear duration-100",
            !fileUrl && "w-0"
          )}
          onClick={handleRemoveImage}
        >
          <ImageMinus />
        </div>
        <div
          className={cn(
            "h-full w-1/2 flex items-center justify-center hover:bg-gray-200/20 ease-linear duration-100",
            !fileUrl && "w-full"
          )}
        >
          <Camera />
        </div>
      </label>
      <input
        id={inputHtmlFor}
        type="file"
        onChange={handleChange}
        className="hidden"
        accept="image/*"
      />

      {!fileUrl || fileUrl.length === 0 ? (
        <Image
          src="/default-user.png"
          width={100}
          height={100}
          alt="User avatar"
          className="w-[100px] h-[100px] flex-shrink-0 object-cover overflow-hidden cursor-pointer"
        />
      ) : (
        <CldImage
          width={0}
          height={0}
          sizes="100vw"
          src={fileUrl!}
          alt="image"
          className="w-full h-full flex-shrink-0 object-cover overflow-hidden cursor-pointer"
        />
      )}
    </div>
  );
};
