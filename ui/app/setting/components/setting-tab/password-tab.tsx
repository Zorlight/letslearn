"use client";
import { Input } from "@/lib/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import { FormProvider, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import PasswordGuiding, {
  PasswordRequirement,
} from "../form-guiding/password-guiding";
import { useMemo } from "react";
import { Button } from "@/lib/shadcn/button";
import { updatePassword } from "@/services/user";
import { toast } from "react-toastify";

type PasswordForm = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

const schema: ZodType<PasswordForm> = z
  .object({
    password: z.string(),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Confirm password does not match",
  });

const initForm = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

export default function PasswordTab() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initForm,
  });
  const { register, watch, setValue, formState, reset } = form;
  const { password, newPassword, confirmPassword } = watch();
  const { errors } = formState;

  const requirements: PasswordRequirement = useMemo(() => {
    return {
      length: newPassword.length >= 8,
    };
  }, [newPassword]);

  const handleInputChange = (key: keyof PasswordForm) => (e: any) => {
    setValue(key, e.target.value);
  };

  const handleUpdatePasswordSuccess = () => {
    toast.success("Password updated");
    reset();
  };
  const handleUpdatePasswordFail = (err: any) => {
    toast.error(err);
  };

  const onSubmit = (data: PasswordForm) => {
    updatePassword(
      data.password,
      data.newPassword,
      handleUpdatePasswordSuccess,
      handleUpdatePasswordFail
    );
  };

  const passwordHtmlFor = nanoid();
  const newPasswordHtmlFor = nanoid();
  const confirmPasswordHtmlFor = nanoid();
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-row items-end gap-6">
          <div className="w-full flex flex-col gap-5">
            <SettingRow label="Password" htmlFor={passwordHtmlFor}>
              <Input
                id={passwordHtmlFor}
                placeholder="Enter your password"
                type="password"
                defaultValue={password !== "" ? password : undefined}
                {...register("password")}
                onChange={handleInputChange("password")}
              />
              {errors?.password && (
                <p className="absolute top-full text-red-500 text-xs font-semibold">
                  {errors.password.message}
                </p>
              )}
            </SettingRow>
            <SettingRow label="New password" htmlFor={newPasswordHtmlFor}>
              <Input
                id={newPasswordHtmlFor}
                placeholder="New password"
                type="password"
                defaultValue={newPassword !== "" ? newPassword : undefined}
                {...register("newPassword")}
                onChange={handleInputChange("newPassword")}
              />
              {errors?.newPassword && (
                <p className="absolute top-full text-red-500 text-xs font-semibold">
                  {errors.newPassword.message}
                </p>
              )}
            </SettingRow>
            <SettingRow
              label="Confirm password"
              htmlFor={confirmPasswordHtmlFor}
            >
              <Input
                id={confirmPasswordHtmlFor}
                placeholder="Confirm password"
                type="password"
                defaultValue={
                  confirmPassword !== "" ? confirmPassword : undefined
                }
                {...register("confirmPassword")}
                onChange={handleInputChange("confirmPassword")}
              />
              {errors?.confirmPassword && (
                <p className="absolute top-full text-red-500 text-xs font-semibold">
                  {errors.confirmPassword.message}
                </p>
              )}
            </SettingRow>
          </div>

          <PasswordGuiding requirements={requirements} />
        </div>
        <Button className="bg-blue-50 text-blue-700 border-[0.5px] border-blue-700 font-bold rounded-lg hover:bg-blue-100 hover:text-blue-800">
          Change password
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
      <label htmlFor={htmlFor} className="w-[200px] font-bold text-sm">
        {label}
      </label>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
};
