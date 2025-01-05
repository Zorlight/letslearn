import CollapsibleList from "@/app/course/[courseId]/components/collapsible/collapsible-list";

import { Button } from "@/lib/shadcn/button";
import { getTextFromHtml } from "@/lib/utils";
import {
  ChoiceQuestion,
  Question,
  QuestionStatus,
  QuestionType,
} from "@/models/question";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import { FormProvider, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import ChoiceQuestionAnswerSetting, {
  ChoiceQuestionAnswerForm,
} from "./answers";
import ChoiceQuestionGeneralSetting, {
  ChoiceQuestionGeneralForm,
} from "./general";
import { defaultAnswerSetting, defaultGeneralSetting } from "./static-data";
import { toast } from "react-toastify";

// Child form schemas
const generalSettingSchema: ZodType<ChoiceQuestionGeneralForm> = z.object({
  questionName: z
    .string()
    .min(1, "Question name must be at least 1 character."),
  questionText: z.string().min(1, "Question text must be at least 1 character"),
  questionStatus: z.nativeEnum(QuestionStatus),
  defaultMark: z.number().int().positive(),
  multipleChoice: z.boolean(),
});

const answerSettingSchema: ZodType<ChoiceQuestionAnswerForm> = z.object({
  choices: z.array(
    z.object({
      id: z.string(),
      text: z.string().refine((data) => getTextFromHtml(data).length > 0, {
        message: "Required",
      }),
      gradePercent: z.number(),
      feedback: z.string(),
      questionId: z.string(),
    })
  ),
});

export type ChoiceQuestionForm = {
  generalSettingForm: ChoiceQuestionGeneralForm;
  answerSettingForm: ChoiceQuestionAnswerForm;
};

// Combine child schemas into one
const schema: ZodType<ChoiceQuestionForm> = z.object({
  generalSettingForm: generalSettingSchema,
  answerSettingForm: answerSettingSchema,
});

interface Props {
  question: Question | undefined;
  onSubmitQuestion?: (data: Question) => void;
}
const ChoiceQuestionUI = ({ question, onSubmitQuestion }: Props) => {
  const handleGetGeneralSetting = (question: Question) => {
    const { data } = question;
    const { multiple } = data as ChoiceQuestion;
    const generalSetting: ChoiceQuestionGeneralForm = {
      questionName: question.questionName,
      questionText: question.questionText,
      questionStatus: question.status,
      defaultMark: question.defaultMark,
      multipleChoice: multiple,
    };
    return generalSetting;
  };
  const handleGetAnswerSetting = (question: Question) => {
    const { data } = question;
    const { choices } = data as ChoiceQuestion;
    const answerSetting: ChoiceQuestionAnswerForm = {
      choices,
    };
    return answerSetting;
  };

  const initGeneralSetting = question
    ? handleGetGeneralSetting(question)
    : defaultGeneralSetting;
  const initAnswerSetting = question
    ? handleGetAnswerSetting(question)
    : defaultAnswerSetting;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      generalSettingForm: initGeneralSetting,
      answerSettingForm: initAnswerSetting,
    },
  });
  const { setValue, watch } = form;

  const { errors } = form.formState;

  const handleGeneralSettingChange = (data: ChoiceQuestionGeneralForm) => {
    setValue("generalSettingForm", data);
  };

  const handleAnswerSettingChange = (data: ChoiceQuestionAnswerForm) => {
    setValue("answerSettingForm", data);
  };

  const handleCreateQuestion = (data: ChoiceQuestionForm) => {
    const questionData: ChoiceQuestion = {
      multiple: data.generalSettingForm.multipleChoice,
      choices: data.answerSettingForm.choices,
    };
    const questionToCreate: Question = {
      id: nanoid(4),
      type: QuestionType.CHOICE,
      questionName: data.generalSettingForm.questionName,
      questionText: data.generalSettingForm.questionText,
      status: data.generalSettingForm.questionStatus,
      defaultMark: data.generalSettingForm.defaultMark,
      createdAt: new Date().toISOString(),
      createdBy: null,
      modifiedAt: new Date().toISOString(),
      modifiedBy: null,
      usage: 0,
      data: questionData,
    };
    return questionToCreate;
  };

  const handleEditQuestion = (question: Question, data: ChoiceQuestionForm) => {
    const questionData: ChoiceQuestion = {
      multiple: data.generalSettingForm.multipleChoice,
      choices: data.answerSettingForm.choices,
    };
    const questionToEdit: Question = {
      ...question,
      questionName: data.generalSettingForm.questionName,
      questionText: data.generalSettingForm.questionText,
      status: data.generalSettingForm.questionStatus,
      defaultMark: data.generalSettingForm.defaultMark,
      modifiedAt: new Date().toISOString(),
      data: questionData,
    };
    return questionToEdit;
  };

  const checkTotalPercentOfAnswer = (question: Question) => {
    const { data } = question;
    const { choices } = data as ChoiceQuestion;
    const totalPercent = choices.reduce((acc, choice) => {
      return acc + choice.gradePercent;
    }, 0);
    return totalPercent >= 100;
  };

  const onSubmit = (data: ChoiceQuestionForm) => {
    let questionToSubmit;
    if (question) questionToSubmit = handleEditQuestion(question, data);
    else questionToSubmit = handleCreateQuestion(data);

    if (!checkTotalPercentOfAnswer(questionToSubmit)) {
      toast.info(
        "Total percent of all answer is less than 100% grade percent."
      );
      return;
    }
    if (onSubmitQuestion) onSubmitQuestion(questionToSubmit);
  };

  const titles = ["General", "Answers"];
  const initShowContent = ["General", "Answers"];
  const collapsibleContent = [
    <ChoiceQuestionGeneralSetting
      key={0}
      formData={watch("generalSettingForm")}
      onChange={handleGeneralSettingChange}
    />,
    <ChoiceQuestionAnswerSetting
      key={1}
      formData={watch("answerSettingForm")}
      onChange={handleAnswerSettingChange}
    />,
  ];

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="font-bold text-2xl text-orange-600">
          {question ? "Editing" : "Adding"} a Multiple or Single choice question
        </h1>
        <CollapsibleList titles={titles} initShowContent={initShowContent}>
          {collapsibleContent}
        </CollapsibleList>
        <div className="w-full flex flex-row justify-center">
          <Button type="submit" variant="default">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ChoiceQuestionUI;
