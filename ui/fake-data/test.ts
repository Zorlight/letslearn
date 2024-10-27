import {
  GradingMethod,
  TimeLimitType,
} from "@/app/courses/[courseId]/quiz/[topicId]/_components/static-data";
import { fakeQuestions } from "./question";
import { Test, TestType } from "@/models/quiz";

export const fakeQuizTest: Test = {
  id: "1",
  name: "Review basic Astronomy knowledge",
  description:
    "This quiz contains a variety of questions to test your basic knowledge of Astronomy. At the end of the quiz you will be given your score with suggestions for improvement.",
  open: {
    enabled: true,
    value: new Date(2024, 11, 10, 10, 30, 0, 0).toISOString(),
  },
  close: {
    enabled: true,
    value: new Date(2024, 11, 10, 14, 30, 0, 0).toISOString(),
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
