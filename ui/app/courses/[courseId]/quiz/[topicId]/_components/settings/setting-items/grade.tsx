"use client";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown } from "lucide-react";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { attemptsAllowedOptions, GradingMethod } from "../../static-data";

export type GradeSettingForm = {
  gradeToPass: number;
  attemptAllowed: string;
  gradingMethod: GradingMethod;
};
const schema: ZodType<GradeSettingForm> = z.object({
  gradeToPass: z
    .number()
    .gte(0, "Grade to pass must be greater than or equal 0"),
  attemptAllowed: z.string(),
  gradingMethod: z.nativeEnum(GradingMethod),
});

interface GradeSettingProps {
  initValue: GradeSettingForm;
  onChange?: (data: GradeSettingForm) => void;
}

const GradeSetting = ({ initValue, onChange }: GradeSettingProps) => {
  const { gradeToPass, attemptAllowed, gradingMethod } = initValue;
  const form = useForm<GradeSettingForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      gradeToPass,
      attemptAllowed,
      gradingMethod,
    },
  });
  const { register, setValue, getValues, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = form.formState;
  const onSubmit = () => {
    const toSubmit = getValues();
    console.log(toSubmit);

    //Logic to update general setting
  };
  const handleSettingChange = (data: GradeSettingForm) => {
    if (onChange) onChange(data);
  };

  const handleNumberChange = (key: keyof GradeSettingForm, value: number) => {
    setValue(key, value);
    handleSettingChange({ ...getValues(), [key]: value });
  };

  const handleComboboxChange = (key: keyof GradeSettingForm, value: string) => {
    setValue(key, value);
    handleSettingChange({ ...getValues(), [key]: value });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col p-4 gap-8"
    >
      <RowSetting title="Grade to pass" htmlFor="grade-setting-gradeToPass">
        <Input
          id="grade-setting-gradeToPass"
          className="w-[150px] focus:outline-none"
          placeholder="Enter a grade"
          type="number"
          {...register("gradeToPass", { valueAsNumber: true })}
          onChange={(e) =>
            handleNumberChange("gradeToPass", Number(e.target.value))
          }
        />
        {errors.gradeToPass && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.gradeToPass.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="Attempts allowed">
        <Combobox
          showSearch={false}
          options={attemptsAllowedOptions}
          initialValue={attemptsAllowedOptions[0]}
          onChange={(value) => handleComboboxChange("attemptAllowed", value)}
          popoverClassName="w-[150px]"
        >
          <Button
            variant="outline"
            className="w-[150px] justify-between text-black border border-gray-300 hover:border-gray-400 hover:bg-gray-50 data-[state=open]:border-blue-500"
          >
            {attemptAllowed}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
      </RowSetting>

      <div className="flex flex-row justify-center">
        <Button type="submit" size="sm">
          Save
        </Button>
      </div>
    </form>
  );
};

interface RowSettingProps {
  title: string;
  htmlFor?: string;
  children?: ReactNode | ReactNode[];
}
const RowSetting = ({ title, children, htmlFor }: RowSettingProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <label className="w-[180px] font-semibold" htmlFor={htmlFor}>
        {title}
      </label>
      <div className="w-full flex flex-row items-center gap-4">{children}</div>
    </div>
  );
};

export default GradeSetting;
