import {
  GradingMethod,
  TimeLimitType,
} from "@/app/courses/[courseId]/quiz/[topicId]/_components/static-data";
import { fakeQuestions } from "./question";
import { Test, TestType } from "@/models/quiz";

export const fakeQuizTest: Test = {
  id: "1",
  name: "Quiz 1",
  description: "This is a test quiz",
  open: {
    enabled: true,
    value: new Date().toISOString(),
  },
  close: {
    enabled: true,
    value: new Date().toISOString(),
  },
  timeLimit: {
    enabled: false,
    value: 1,
    unit: TimeLimitType.HOURS,
  },
  type: TestType.QUIZ,
  data: {
    gradeToPass: 5,
    gradingMethod: GradingMethod.HIGHEST_GRADE,
    attemptAllowed: "Unlimited",
    questions: fakeQuestions.slice(0, 6),
  },
};
