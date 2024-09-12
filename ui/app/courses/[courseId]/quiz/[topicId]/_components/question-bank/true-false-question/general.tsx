"use client";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import TinyEditor from "@/lib/tinymce/editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { QuestionStatus } from "../../static-data";
import { nanoid } from "@reduxjs/toolkit";
import { Combobox } from "@/components/ui/combobox";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type TrueFalseQuestionGeneralForm = {
  questionName: string;
  questionText: string;
  questionStatus: QuestionStatus;
  defaultMark: number;
  correctAnswer: boolean;
  feedbackOfTrue: string;
  feedbackOfFalse: string;
};
const schema: ZodType<TrueFalseQuestionGeneralForm> = z.object({
  questionName: z.string().min(1, "Name is required"),
  questionText: z.string(),
  questionStatus: z.nativeEnum(QuestionStatus),
  defaultMark: z.number().int().positive(),
  correctAnswer: z.boolean(),
  feedbackOfTrue: z.string(),
  feedbackOfFalse: z.string(),
});

interface Props {
  initValue: TrueFalseQuestionGeneralForm;
  onChange?: (data: TrueFalseQuestionGeneralForm) => void;
}

const TrueFalseQuestionGeneralSetting = ({ initValue, onChange }: Props) => {
  const {
    questionName,
    questionText,
    questionStatus,
    defaultMark,
    correctAnswer,
    feedbackOfTrue,
    feedbackOfFalse,
  } = initValue;
  const form = useForm<TrueFalseQuestionGeneralForm>({
    resolver: zodResolver(schema),
    defaultValues: initValue,
  });
  const { register, setValue, getValues, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = form.formState;
  const onSubmit = () => {
    const toSubmit = getValues();
    console.log(toSubmit);

    //Logic to update general setting
  };
  const handleSettingChange = (data: TrueFalseQuestionGeneralForm) => {
    if (onChange) onChange(data);
  };
  const handleEditorChange = (
    key: keyof TrueFalseQuestionGeneralForm,
    data: any
  ) => {
    //set value because the editor is not a controlled component (not registered with react-hook-form)
    setValue(key, data);
    handleSettingChange({ ...getValues(), [key]: data });
  };

  const handleInputChange = (
    key: keyof TrueFalseQuestionGeneralForm,
    data: string
  ) => {
    setValue(key, data);
    handleSettingChange({ ...getValues(), [key]: data });
  };

  const handleComboboxChange = (
    key: keyof TrueFalseQuestionGeneralForm,
    data: string
  ) => {
    setValue(key, data);
    handleSettingChange({ ...getValues(), [key]: data });
  };

  const questionStatusOptions = Object.values(QuestionStatus);
  const questionNameHtmlFor = nanoid();
  const defaultMarkHtmlFor = nanoid();
  const correctAnswerOptions = ["True", "False"];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col p-4 gap-8"
    >
      <RowSetting title="Question name" htmlFor={questionNameHtmlFor}>
        <Input
          id={questionNameHtmlFor}
          className="flex-1 focus:outline-none"
          placeholder="Enter a name"
          defaultValue={questionName !== "" ? questionName : undefined}
          {...register("questionName")}
          onChange={(e) => handleInputChange("questionName", e.target.value)}
        />
        {errors.questionName && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.questionName.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="Question text" className="items-start">
        <TinyEditor
          onChange={(data) => handleEditorChange("questionText", data)}
          initValue={questionText}
        />
      </RowSetting>
      <RowSetting title="Question status">
        <Combobox
          showSearch={false}
          initialValue={questionStatusOptions[0]}
          options={questionStatusOptions}
          onChange={(value) => handleComboboxChange("questionStatus", value)}
          className="w-40"
          popoverClassName="w-40"
        >
          <Button variant="outline" className="w-full justify-between">
            {questionStatus}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
      </RowSetting>
      <RowSetting title="Default mark" htmlFor={defaultMarkHtmlFor}>
        <Input
          id={defaultMarkHtmlFor}
          className="w-40 focus:outline-none"
          placeholder="Enter a name"
          type="number"
          defaultValue={defaultMark != 0 ? defaultMark : undefined}
          {...register("defaultMark")}
          onChange={(e) => handleInputChange("defaultMark", e.target.value)}
        />
        {errors.defaultMark && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.defaultMark.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="Correct answer">
        <Combobox
          showSearch={false}
          initialValue={correctAnswerOptions[0]}
          options={correctAnswerOptions}
          onChange={(value) => handleComboboxChange("correctAnswer", value)}
          className="w-40"
          popoverClassName="w-40"
        >
          <Button variant="outline" className="w-full justify-between">
            {correctAnswer ? "True" : "False"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
      </RowSetting>
      <RowSetting
        title="Feedback for the response 'True'"
        className="items-start"
      >
        <TinyEditor
          onChange={(data) => handleEditorChange("feedbackOfTrue", data)}
          initValue={feedbackOfTrue}
        />
      </RowSetting>
      <RowSetting
        title="Feedback for the response 'False'"
        className="items-start"
      >
        <TinyEditor
          onChange={(data) => handleEditorChange("feedbackOfFalse", data)}
          initValue={feedbackOfFalse}
        />
      </RowSetting>
      <div className="flex flex-row justify-center">
        <Button type="submit" size="sm">
          Save
        </Button>
      </div>
    </form>
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
      <label htmlFor={htmlFor} className="w-[300px] font-semibold">
        {title}
      </label>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
};

export default TrueFalseQuestionGeneralSetting;
