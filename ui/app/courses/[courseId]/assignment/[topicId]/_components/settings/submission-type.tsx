"use client";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Checkbox } from "@/lib/shadcn/checkbox";
import { Input } from "@/lib/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import { ChevronsUpDown } from "lucide-react";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import {
  acceptedFileTypes,
  descriptionAcceptedFileTypes,
  maximumSubmissionsSizes,
} from "../static-data";

export enum SubmissionType {
  ONLINE_TEXT = "Online Text",
  FILE_UPLOAD = "File Upload",
}
export type SubmissionTypeSettingForm = {
  submissionType: SubmissionType[];
  wordLimit: {
    enabled: boolean;
    value: number;
  };
  maximumFiles: number | null;
  maximumSize: string | null;
  acceptFileTypes: string[] | null;
};
const schema: ZodType<SubmissionTypeSettingForm> = z.object({
  submissionType: z.array(z.nativeEnum(SubmissionType)),
  wordLimit: z.object({
    enabled: z.boolean(),
    value: z.number(),
  }),
  maximumFiles: z.number().nullable(),
  maximumSize: z.string().nullable(),
  acceptFileTypes: z.array(z.string()).nullable(),
});

interface SubmissionTypeSettingProps {
  initValue: SubmissionTypeSettingForm;
  onChange?: (data: SubmissionTypeSettingForm) => void;
}

const SubmissionTypeSetting = ({
  initValue,
  onChange,
}: SubmissionTypeSettingProps) => {
  const {
    submissionType,
    wordLimit,
    maximumFiles,
    maximumSize,
    acceptFileTypes,
  } = initValue;
  const form = useForm<SubmissionTypeSettingForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      submissionType: submissionType,
      wordLimit: wordLimit,
      maximumFiles: maximumFiles,
      maximumSize: maximumSize,
      acceptFileTypes: acceptFileTypes,
    },
  });
  const { register, setValue, getValues, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = form.formState;
  const onSubmit = () => {
    const toSubmit = getValues();
    console.log(toSubmit);

    //Logic to update general setting
  };
  const handleSettingChange = (data: SubmissionTypeSettingForm) => {
    if (onChange) onChange(data);
  };

  const handleCheckedChange = (type: SubmissionType, checked: boolean) => {
    let newSubmissionType;
    if (checked) newSubmissionType = [...submissionType, type];
    else newSubmissionType = submissionType.filter((t) => t !== type);

    setValue("submissionType", newSubmissionType);
    handleSettingChange({ ...getValues(), submissionType: newSubmissionType });
  };

  const handleWordLimitChange = (value: number) => {
    handleSettingChange({ ...getValues(), wordLimit: { ...wordLimit, value } });
  };

  const handleEnabledWordLimitChange = (enabled: boolean) => {
    handleSettingChange({
      ...getValues(),
      wordLimit: { ...wordLimit, enabled },
    });
  };

  const handleNumberChange = (
    key: keyof SubmissionTypeSettingForm,
    value: number
  ) => {
    setValue(key, value);
    handleSettingChange({ ...getValues(), [key]: value });
  };

  const handleSingleChoiceComboboxChange = (
    key: keyof SubmissionTypeSettingForm,
    value: string
  ) => {
    setValue(key, value);
    handleSettingChange({ ...getValues(), [key]: value });
  };

  const handleMultipleChoiceComboboxChange = (
    key: keyof SubmissionTypeSettingForm,
    value: string[]
  ) => {
    setValue(key, value);
    handleSettingChange({ ...getValues(), [key]: value });
  };

  const submissionTypes = Object.values(SubmissionType);
  const wordLimitHtmlFor = nanoid();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col p-4 gap-8"
    >
      <RowSetting title="Submission types">
        {submissionTypes.map((type) => {
          const htmlFor = nanoid();
          return (
            <span key={type} className="w-fit flex flex-row items-center gap-2">
              <Checkbox
                id={htmlFor}
                defaultChecked={submissionType.includes(type)}
                onCheckedChange={(checked) =>
                  handleCheckedChange(type, !!checked)
                }
              />
              <label htmlFor={htmlFor}>{type}</label>
            </span>
          );
        })}
      </RowSetting>
      <RowSetting title="Word limit">
        <div className="flex flex-col">
          <Input
            className="w-[150px] focus:outline-none"
            placeholder="Enter a number"
            type="number"
            disabled={!wordLimit.enabled}
            {...register("wordLimit.value", { valueAsNumber: true })}
            onChange={(e) => handleWordLimitChange(parseInt(e.target.value))}
          />
          {errors.wordLimit?.value && (
            <p className="absolute top-full text-red-500 text-xs font-semibold">
              {errors.wordLimit.value?.message}
            </p>
          )}
        </div>
        <div className="flex flex-row items-center gap-2">
          <Checkbox
            id={wordLimitHtmlFor}
            defaultChecked={wordLimit.enabled}
            onCheckedChange={(checked) =>
              handleEnabledWordLimitChange(!!checked)
            }
          />
          <label htmlFor={wordLimitHtmlFor}>Enable</label>
        </div>
      </RowSetting>
      {submissionType.includes(SubmissionType.FILE_UPLOAD) && (
        <RowSetting title="Maximum number of uploaded files">
          <Input
            className="w-[150px] focus:outline-none"
            placeholder="Enter a number"
            type="number"
            {...register("maximumFiles", { valueAsNumber: true })}
            onChange={(e) =>
              handleNumberChange("maximumFiles", parseInt(e.target.value))
            }
          />
        </RowSetting>
      )}
      {submissionType.includes(SubmissionType.FILE_UPLOAD) && (
        <RowSetting title="Maximum submission size">
          <Combobox
            name="Submission size"
            options={maximumSubmissionsSizes}
            initialValue={maximumSubmissionsSizes[0]}
            onChange={(value) =>
              handleSingleChoiceComboboxChange("maximumSize", value)
            }
          >
            <Button
              variant="outline"
              className="min-w-[280px] justify-between text-black border border-gray-300 hover:border-gray-400 hover:bg-gray-50 data-[state=open]:border-blue-500"
            >
              {maximumSize
                ? `Submission upload limit (${maximumSize})`
                : `Submission upload limit (${maximumSubmissionsSizes[0]})`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </Combobox>
        </RowSetting>
      )}
      {submissionType.includes(SubmissionType.FILE_UPLOAD) && (
        <RowSetting title="Accepted file types">
          <Combobox
            name="Accepted file types"
            options={acceptedFileTypes}
            optionDescription={descriptionAcceptedFileTypes}
            initialValue={acceptedFileTypes[0]}
            multiple
            onMultipleChange={(value) =>
              handleMultipleChoiceComboboxChange("acceptFileTypes", value)
            }
          >
            <Button
              variant="outline"
              className="min-w-[300px] justify-between text-black border border-gray-300 hover:border-gray-400 hover:bg-gray-50 data-[state=open]:border-blue-500"
            >
              {!acceptFileTypes || acceptFileTypes.length === 0
                ? `No file type selected`
                : acceptFileTypes.length === acceptedFileTypes.length
                ? `Accept all file types`
                : `Accept file types (${acceptFileTypes.length})`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </Combobox>
        </RowSetting>
      )}

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
  children?: ReactNode | ReactNode[];
  htmlFor?: string;
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

export default SubmissionTypeSetting;
