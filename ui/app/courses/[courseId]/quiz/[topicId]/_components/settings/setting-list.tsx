"use client";
import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import { Button } from "@/lib/shadcn/button";
import { Quiz } from "@/models/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z, ZodType } from "zod";
import { GradingMethod, TimeLimitType } from "../static-data";
import GeneralSetting, { GeneralSettingForm } from "./setting-items/general";
import GradeSetting, { GradeSettingForm } from "./setting-items/grade";
import TimingSetting, { TimingSettingForm } from "./setting-items/timing";
import {
  defaultGeneralSetting,
  defaultGradeSetting,
  defaultTimingSetting,
} from "./static-data";
import { useMemo } from "react";

const generalSettingSchema: ZodType<GeneralSettingForm> = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
});

const timingSettingSchema: ZodType<TimingSettingForm> = z.object({
  open: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
  close: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
  timeLimit: z.object({
    enabled: z.boolean(),
    value: z.number(),
    unit: z.nativeEnum(TimeLimitType),
  }),
});

const gradeSettingSchema: ZodType<GradeSettingForm> = z.object({
  gradeToPass: z
    .number()
    .gte(0, "Grade to pass must be greater than or equal 0"),
  attemptAllowed: z.string(),
  gradingMethod: z.nativeEnum(GradingMethod),
});

export type QuizSettingForm = {
  generalSettingForm: GeneralSettingForm;
  timingSettingForm: TimingSettingForm;
  gradeSettingForm: GradeSettingForm;
};

// Combine child schemas into one
const schema: ZodType<QuizSettingForm> = z.object({
  generalSettingForm: generalSettingSchema,
  timingSettingForm: timingSettingSchema,
  gradeSettingForm: gradeSettingSchema,
});

interface Props {
  quiz: Quiz;
  onSubmitQuizSetting?: (data: Quiz) => void;
}
const SettingList = ({ quiz, onSubmitQuizSetting }: Props) => {
  const handleGetGeneralSetting = (quiz: Quiz) => {
    const generalSetting: GeneralSettingForm = {
      name: quiz.name,
      description: quiz.description,
    };
    return generalSetting;
  };

  const handleGetTimingSetting = (quiz: Quiz) => {
    const timingSetting: TimingSettingForm = {
      open: {
        enabled: quiz.open.enabled,
        value: quiz.open.value,
      },
      close: {
        enabled: quiz.close.enabled,
        value: quiz.close.value,
      },
      timeLimit: {
        enabled: quiz.timeLimit.enabled,
        value: quiz.timeLimit.value,
        unit: quiz.timeLimit.unit as TimeLimitType,
      },
    };
    return timingSetting;
  };

  const handleGetGradeSetting = (quiz: Quiz) => {
    const gradeSetting: GradeSettingForm = {
      gradeToPass: quiz.gradeToPass,
      gradingMethod: quiz.gradingMethod as GradingMethod,
      attemptAllowed: quiz.attemptAllowed,
    };
    return gradeSetting;
  };

  const initGeneralSetting = quiz
    ? handleGetGeneralSetting(quiz)
    : defaultGeneralSetting;
  const initTimingSetting = quiz
    ? handleGetTimingSetting(quiz)
    : defaultTimingSetting;
  const initGradeSetting = quiz
    ? handleGetGradeSetting(quiz)
    : defaultGradeSetting;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      generalSettingForm: initGeneralSetting,
      timingSettingForm: initTimingSetting,
      gradeSettingForm: initGradeSetting,
    },
  });
  const { setValue, watch } = form;

  //use for auto save setting and update the state when the show content is closed
  const handleGeneralSettingChange = (data: GeneralSettingForm) => {
    setValue("generalSettingForm", data);
  };

  const handleTimingSettingChange = (data: TimingSettingForm) => {
    setValue("timingSettingForm", data);
  };

  const handleGradeSettingChange = (data: GradeSettingForm) => {
    setValue("gradeSettingForm", data);
  };

  const handleUpdateQuiz = (data: QuizSettingForm) => {
    const quizToUpdate = {
      ...quiz,
      name: data.generalSettingForm.name,
      description: data.generalSettingForm.description,
      open: data.timingSettingForm.open,
      close: data.timingSettingForm.close,
      timeLimit: data.timingSettingForm.timeLimit,
      gradeToPass: data.gradeSettingForm.gradeToPass,
      gradingMethod: data.gradeSettingForm.gradingMethod,
      attemptAllowed: data.gradeSettingForm.attemptAllowed,
    };

    return quizToUpdate;
  };

  const compareQuiz = (quiz1: Quiz, quiz2: Quiz) => {
    return JSON.stringify(quiz1) === JSON.stringify(quiz2);
  };

  const onSubmit = (data: QuizSettingForm) => {
    const quizToSubmit = handleUpdateQuiz(data);
    if (compareQuiz(quiz, quizToSubmit)) {
      toast.info("No changes to submit");
      return;
    }
    if (onSubmitQuizSetting) onSubmitQuizSetting(quizToSubmit);
  };

  const titles = ["General", "Timing", "Grade"];
  const isQuizSettingChange = useMemo(() => {
    return !compareQuiz(quiz, handleUpdateQuiz(form.getValues()));
  }, [quiz, form.getValues()]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CollapsibleList titles={titles}>
          <GeneralSetting
            formData={watch("generalSettingForm")}
            onChange={handleGeneralSettingChange}
          />
          <TimingSetting
            formData={watch("timingSettingForm")}
            onChange={handleTimingSettingChange}
          />
          <GradeSetting
            formData={watch("gradeSettingForm")}
            onChange={handleGradeSettingChange}
          />
        </CollapsibleList>
        <div className="w-full flex flex-row justify-center">
          <Button
            type="submit"
            disabled={!isQuizSettingChange}
            variant="default"
          >
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SettingList;
