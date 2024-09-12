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
import { QuestionChoice } from "@/models/question";

export type MultipleChoiceQuestionAnswerForm = {
  choices: QuestionChoice[];
};
const schema: ZodType<MultipleChoiceQuestionAnswerForm> = z.object({
  choices: z.array(
    z.object({
      text: z.string(),
      gradePercent: z.number(),
      feedback: z.string(),
    })
  ),
});

interface Props {
  initValue: MultipleChoiceQuestionAnswerForm;
  onChange?: (data: MultipleChoiceQuestionAnswerForm) => void;
}

const MultipleChoiceQuestionAnswerSetting = ({
  initValue,
  onChange,
}: Props) => {
  const { choices } = initValue;
  const form = useForm<MultipleChoiceQuestionAnswerForm>({
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
  const handleSettingChange = (data: MultipleChoiceQuestionAnswerForm) => {
    if (onChange) onChange(data);
  };

  const handleChoiceChange = (index: number, choice: QuestionChoice) => {
    const newChoices = [...choices];
    newChoices[index] = choice;
    setValue("choices", newChoices);
    handleSettingChange({ ...getValues(), choices: newChoices });
  };

  const handleAddChoice = () => {
    const newChoices = [
      ...choices,
      { text: "", gradePercent: 100, feedback: "" },
    ];
    setValue("choices", newChoices);
    handleSettingChange({ ...getValues(), choices: newChoices });
  };

  const handleRemoveChoice = () => {
    const newChoices = [...choices];
    newChoices.pop();
    setValue("choices", newChoices);
    handleSettingChange({ ...getValues(), choices: newChoices });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col p-4 gap-8"
    >
      {choices.map((choice, index) => (
        <AnswerRowSetting
          key={index}
          rowIndex={index}
          choice={choice}
          onChoiceChange={handleChoiceChange}
        />
      ))}

      <div className="flex flex-row justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddChoice}
        >
          <CirclePlus size={16} />
          Add new choice
        </Button>
        {choices.length > 3 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-red-500 border-red-600 hover:bg-red-50"
            onClick={handleRemoveChoice}
          >
            <Trash size={16} />
            Remove last choice
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
  choice: QuestionChoice;
  onChoiceChange?: (index: number, choice: QuestionChoice) => void;
}
const AnswerRowSetting = ({
  rowIndex,
  className,
  choice,
  onChoiceChange,
}: AnswerRowProps) => {
  const onEditorChange = (value: string) => {
    if (onChoiceChange) onChoiceChange(rowIndex, { ...choice, text: value });
  };

  const onGradePercentChange = (gradePercent: number) => {
    if (onChoiceChange) onChoiceChange(rowIndex, { ...choice, gradePercent });
  };

  return (
    <div
      className={cn(
        "py-6 px-8 rounded-md bg-slate-50 flex flex-col gap-4",
        className
      )}
    >
      <RowSetting title={`Choice ${rowIndex + 1}`} className="items-start">
        <TinyEditor
          onChange={(data) => onEditorChange(data)}
          initValue={choice.text}
        />
      </RowSetting>
      <RowSetting title="Grade">
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
            {choice.gradePercent} %
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
      </RowSetting>
      <RowSetting title="Feedback" className="items-start">
        <TinyEditor
          onChange={(data) => onEditorChange(data)}
          initValue={choice.feedback}
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

export default MultipleChoiceQuestionAnswerSetting;
