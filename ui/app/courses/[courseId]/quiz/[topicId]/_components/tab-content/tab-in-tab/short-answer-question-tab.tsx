import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import { fakeUser } from "@/fake-data/user";
import { Button } from "@/lib/shadcn/button";
import { ShortAnswerQuestion } from "@/models/question";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import { FormProvider, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import ShortAnswerQuestionAnswerSetting, {
  ShortAnswerQuestionAnswerForm,
} from "../../question-bank/short-answer-question/answers";
import ShortAnswerQuestionGeneralSetting, {
  ShortAnswerQuestionGeneralForm,
} from "../../question-bank/short-answer-question/general";
import { QuestionStatus, QuestionType } from "../../static-data";
import {
  dafaultGeneralSetting,
  defaultAnswerSetting,
} from "../_components/short-answer-question-tab/static-data";
import { getTextFromHtml } from "@/lib/utils";

const generalSettingSchema: ZodType<ShortAnswerQuestionGeneralForm> = z.object({
  questionName: z.string().min(1, "Required"),
  questionText: z.string().min(1, "Required"),
  questionStatus: z.nativeEnum(QuestionStatus),
  defaultMark: z.number().int().positive(),
});

const answerSettingSchema: ZodType<ShortAnswerQuestionAnswerForm> = z.object({
  answers: z.array(
    z.object({
      text: z.string().refine((data) => getTextFromHtml(data).length > 0, {
        message: "Required",
      }),
      gradePercent: z.number(),
      feedback: z.string(),
    })
  ),
});

export type ShortAnswerQuestionForm = {
  generalSettingForm: ShortAnswerQuestionGeneralForm;
  answerSettingForm: ShortAnswerQuestionAnswerForm;
};

// Combine child schemas into one
const schema: ZodType<ShortAnswerQuestionForm> = z.object({
  generalSettingForm: generalSettingSchema,
  answerSettingForm: answerSettingSchema,
});

interface Props {
  question: ShortAnswerQuestion | undefined;
  onSubmitQuestion?: (data: ShortAnswerQuestion) => void;
}
const ShortAnswerQuestionTab = ({ question, onSubmitQuestion }: Props) => {
  const thisUser = fakeUser;
  const handleGetGeneralSetting = (question: ShortAnswerQuestion) => {
    const generalSetting: ShortAnswerQuestionGeneralForm = {
      questionName: question.questionName,
      questionText: question.questionText,
      questionStatus: question.status,
      defaultMark: question.defaultMark,
    };
    return generalSetting;
  };
  const handleGetAnswerSetting = (question: ShortAnswerQuestion) => {
    const answerSetting: ShortAnswerQuestionAnswerForm = {
      answers: question.choices,
    };
    return answerSetting;
  };

  const initGeneralSetting = question
    ? handleGetGeneralSetting(question)
    : dafaultGeneralSetting;
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

  const handleGeneralSettingChange = (data: ShortAnswerQuestionGeneralForm) => {
    setValue("generalSettingForm", data);
  };

  const handleAnswerSettingChange = (data: ShortAnswerQuestionAnswerForm) => {
    setValue("answerSettingForm", data);
  };

  const handleCreateQuestion = (data: ShortAnswerQuestionForm) => {
    const questionToCreate: ShortAnswerQuestion = {
      id: nanoid(),
      type: QuestionType.SHORT_ANSWER,
      questionName: data.generalSettingForm.questionName,
      questionText: data.generalSettingForm.questionText,
      status: data.generalSettingForm.questionStatus,
      defaultMark: data.generalSettingForm.defaultMark,
      choices: data.answerSettingForm.answers,
      createdAt: new Date().toISOString(),
      createdBy: thisUser.username,
      modifiedAt: new Date().toISOString(),
      modifiedBy: thisUser.username,
      usage: 0,
    };
    return questionToCreate;
  };

  const handleEditQuestion = (
    question: ShortAnswerQuestion,
    data: ShortAnswerQuestionForm
  ) => {
    const questionToEdit: ShortAnswerQuestion = {
      ...question,
      questionName: data.generalSettingForm.questionName,
      questionText: data.generalSettingForm.questionText,
      status: data.generalSettingForm.questionStatus,
      defaultMark: data.generalSettingForm.defaultMark,
      choices: data.answerSettingForm.answers,
      createdAt: new Date().toISOString(),
      createdBy: thisUser.username,
      modifiedAt: new Date().toISOString(),
      modifiedBy: thisUser.username,
    };
    return questionToEdit;
  };

  const onSubmit = (data: ShortAnswerQuestionForm) => {
    let questionToSubmit;
    if (question) questionToSubmit = handleEditQuestion(question, data);
    else questionToSubmit = handleCreateQuestion(data);

    if (onSubmitQuestion) onSubmitQuestion(questionToSubmit);
  };

  const titles = ["General", "Answers"];
  const initShowContent = ["General", "Answers"];
  const collapsibleContent = [
    <ShortAnswerQuestionGeneralSetting
      key={0}
      formData={watch("generalSettingForm")}
      onChange={handleGeneralSettingChange}
    />,
    <ShortAnswerQuestionAnswerSetting
      key={1}
      formData={watch("answerSettingForm")}
      onChange={handleAnswerSettingChange}
    />,
  ];
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="font-bold text-2xl text-orange-600">
          Adding a Short answer question
        </h1>
        <CollapsibleList titles={titles} initShowContent={initShowContent}>
          {collapsibleContent}
        </CollapsibleList>
        <div className="w-full flex flex-row justify-center">
          <Button type="submit" variant="default">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ShortAnswerQuestionTab;
