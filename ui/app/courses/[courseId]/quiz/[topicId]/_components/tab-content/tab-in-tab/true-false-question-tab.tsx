import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import { fakeUser } from "@/fake-data/user";
import { Button } from "@/lib/shadcn/button";
import { TrueFalseQuestion } from "@/models/question";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import { FormProvider, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import TrueFalseQuestionGeneralSetting, {
  TrueFalseQuestionGeneralForm,
} from "../../question-bank/true-false-question/general";
import { QuestionStatus, QuestionType } from "../../static-data";
import { defaultGeneralSetting } from "../_components/true-false-question-tab/static-data";

const generalSettingSchema: ZodType<TrueFalseQuestionGeneralForm> = z.object({
  questionName: z.string().min(1, "Required"),
  questionText: z.string().min(1, "Required"),
  questionStatus: z.nativeEnum(QuestionStatus),
  defaultMark: z.number().int().positive(),
  correctAnswer: z.boolean(),
  feedbackOfTrue: z.string(),
  feedbackOfFalse: z.string(),
});

export type TrueFalseQuestionForm = {
  generalSettingForm: TrueFalseQuestionGeneralForm;
};

const schema: ZodType<TrueFalseQuestionForm> = z.object({
  generalSettingForm: generalSettingSchema,
});

interface Props {
  question: TrueFalseQuestion | undefined;
  onSubmitQuestion?: (data: TrueFalseQuestion) => void;
}
const TrueFalseQuestionTab = ({ question, onSubmitQuestion }: Props) => {
  const thisUser = fakeUser;
  const handleGetGeneralSetting = (question: TrueFalseQuestion) => {
    const generalSetting: TrueFalseQuestionGeneralForm = {
      questionName: question.questionName,
      questionText: question.questionText,
      questionStatus: question.status,
      defaultMark: question.defaultMark,
      correctAnswer: question.correctAnswer,
      feedbackOfTrue: question.feedbackOfTrue,
      feedbackOfFalse: question.feedbackOfFalse,
    };
    return generalSetting;
  };

  const initGeneralSetting = question
    ? handleGetGeneralSetting(question)
    : defaultGeneralSetting;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      generalSettingForm: initGeneralSetting,
    },
  });
  const { setValue, watch } = form;

  const handleCreateQuestion = (data: TrueFalseQuestionForm) => {
    const questionToCreate: TrueFalseQuestion = {
      id: nanoid(),
      type: QuestionType.TRUE_FALSE,
      questionName: data.generalSettingForm.questionName,
      questionText: data.generalSettingForm.questionText,
      status: data.generalSettingForm.questionStatus,
      defaultMark: data.generalSettingForm.defaultMark,
      correctAnswer: data.generalSettingForm.correctAnswer,
      feedbackOfTrue: data.generalSettingForm.feedbackOfTrue,
      feedbackOfFalse: data.generalSettingForm.feedbackOfFalse,
      createdBy: thisUser.username,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      modifiedBy: thisUser.username,
      usage: 0,
    };
    return questionToCreate;
  };

  const handleEditQuestion = (
    question: TrueFalseQuestion,
    data: TrueFalseQuestionForm
  ) => {
    const questionToEdit: TrueFalseQuestion = {
      ...question,
      questionName: data.generalSettingForm.questionName,
      questionText: data.generalSettingForm.questionText,
      status: data.generalSettingForm.questionStatus,
      defaultMark: data.generalSettingForm.defaultMark,
      correctAnswer: data.generalSettingForm.correctAnswer,
      feedbackOfTrue: data.generalSettingForm.feedbackOfTrue,
      feedbackOfFalse: data.generalSettingForm.feedbackOfFalse,
      modifiedAt: new Date().toISOString(),
      modifiedBy: thisUser.username,
    };
    return questionToEdit;
  };

  const handleGeneralSettingChange = (data: TrueFalseQuestionGeneralForm) => {
    setValue("generalSettingForm", data);
  };

  const onSubmit = (data: TrueFalseQuestionForm) => {
    let questionToSubmit;
    if (question) questionToSubmit = handleEditQuestion(question, data);
    else questionToSubmit = handleCreateQuestion(data);

    if (onSubmitQuestion) onSubmitQuestion(questionToSubmit);
  };

  const titles = ["General"];
  const initShowContent = ["General"];
  const collapsibleContent = [
    <TrueFalseQuestionGeneralSetting
      key={0}
      formData={watch("generalSettingForm")}
      onChange={handleGeneralSettingChange}
    />,
  ];

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="font-bold text-2xl text-orange-600">
          Adding a True/False question
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

export default TrueFalseQuestionTab;
