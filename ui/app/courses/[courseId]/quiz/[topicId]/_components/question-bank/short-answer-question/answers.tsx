"use client";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import TinyEditor from "@/lib/tinymce/editor";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import { ChevronsUpDown, CirclePlus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { gradePercentOptions } from "../../static-data";

type ShortAnswer = {
  text: string;
  gradePercent: number;
  feedback: string;
};

export type ShortAnswerQuestionAnswerForm = {
  answers: ShortAnswer[];
};
const schema: ZodType<ShortAnswerQuestionAnswerForm> = z.object({
  answers: z.array(
    z.object({
      text: z.string(),
      gradePercent: z.number(),
      feedback: z.string(),
    })
  ),
});

interface Props {
  initValue: ShortAnswerQuestionAnswerForm;
  onChange?: (data: ShortAnswerQuestionAnswerForm) => void;
}

const ShortAnswerQuestionAnswerSetting = ({ initValue, onChange }: Props) => {
  const { answers } = initValue;
  const form = useForm<ShortAnswerQuestionAnswerForm>({
    resolver: zodResolver(schema),
    defaultValues: initValue,
  });
  const { register, setValue, getValues, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = form.formState;
  const onSubmit = () => {
    const toSubmit = getValues();
    console.log(toSubmit);

    //Logic to update Answer setting
  };
  const handleSettingChange = (data: ShortAnswerQuestionAnswerForm) => {
    if (onChange) onChange(data);
  };

  const handleAnswerChange = (index: number, answer: ShortAnswer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setValue("answers", newAnswers);
    handleSettingChange({ ...getValues(), answers: newAnswers });
  };

  const handleAddAnswer = () => {
    const newAnswers = [
      ...answers,
      { text: "", gradePercent: 100, feedback: "" },
    ];
    setValue("answers", newAnswers);
    handleSettingChange({ ...getValues(), answers: newAnswers });
  };

  const handleRemoveAnswer = () => {
    const newAnswers = answers.slice(0, answers.length - 1);
    setValue("answers", newAnswers);
    handleSettingChange({ ...getValues(), answers: newAnswers });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col p-4 gap-8"
    >
      {answers.map((answer, index) => (
        <AnswerRowSetting
          key={index}
          rowIndex={index}
          shortAnswer={answer}
          textError={errors.answers?.[index]?.text?.message}
          onAnswerChange={handleAnswerChange}
        />
      ))}

      <div className="flex flex-row justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddAnswer}
        >
          <CirclePlus size={16} />
          Add new answer
        </Button>
        {answers.length > 3 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-red-500 border-red-600 hover:bg-red-50"
            onClick={handleRemoveAnswer}
          >
            <Trash size={16} />
            Remove last answer
          </Button>
        )}
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
      <label htmlFor={htmlFor} className="w-[252px] font-semibold">
        {title}
      </label>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
};

interface AnswerRowProps {
  rowIndex: number;
  className?: string;
  shortAnswer: ShortAnswer;
  textError?: string;
  onAnswerChange?: (index: number, answer: ShortAnswer) => void;
}
const AnswerRowSetting = ({
  rowIndex,
  className,
  shortAnswer,
  textError,
  onAnswerChange,
}: AnswerRowProps) => {
  const textHtmlFor = nanoid();

  const onTextChange = (text: string) => {
    if (onAnswerChange) onAnswerChange(rowIndex, { ...shortAnswer, text });
  };

  const onGradePercentChange = (gradePercent: number) => {
    if (onAnswerChange)
      onAnswerChange(rowIndex, { ...shortAnswer, gradePercent });
  };

  const onFeedbackChange = (feedback: string) => {
    if (onAnswerChange) onAnswerChange(rowIndex, { ...shortAnswer, feedback });
  };

  return (
    <div
      className={cn(
        "py-6 px-8 rounded-md bg-slate-50 flex flex-col gap-4",
        className
      )}
    >
      <RowSetting title={`Answer ${rowIndex + 1}`} htmlFor={textHtmlFor}>
        <div className="flex flex-row items-center gap-4">
          <div>
            <Input
              id={textHtmlFor}
              className="w-[300px] focus:outline-none"
              placeholder="Enter an answer"
              defaultValue={
                shortAnswer.text !== "" ? shortAnswer.text : undefined
              }
              onChange={(e) => onTextChange(e.target.value)}
            />
            {textError && (
              <p className="absolute top-full text-red-500 text-xs font-semibold">
                {textError}
              </p>
            )}
          </div>
          <span className="w-[100px] font-semibold">Grade percent</span>
          <Combobox
            showSearch={false}
            initialValue={gradePercentOptions[0]}
            options={gradePercentOptions}
            OptionUI={OptionUI}
            onChange={(value) => onGradePercentChange(parseInt(value))}
            className="w-40"
            popoverClassName="w-40"
          >
            <Button variant="outline" className="w-full justify-between">
              {`${shortAnswer.gradePercent} %`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </Combobox>
        </div>
      </RowSetting>
      <RowSetting title="Feedback" className="items-start">
        <TinyEditor
          onChange={(data) => onFeedbackChange(data)}
          initValue={shortAnswer.feedback}
        />
      </RowSetting>
    </div>
  );
};

interface OptionUIProps {
  children?: React.ReactNode;
}
const OptionUI = ({ children }: OptionUIProps) => {
  return <div className="">{children} %</div>;
};

export default ShortAnswerQuestionAnswerSetting;
