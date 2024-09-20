import {
  GradingMethod,
  TimeLimitType,
} from "@/app/courses/[courseId]/quiz/[topicId]/_components/static-data";
import { Quiz } from "@/models/quiz";
import { fakeQuestions } from "./question";

export const fakeQuiz: Quiz = {
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
  gradeToPass: 5,
  gradingMethod: GradingMethod.HIGHEST_GRADE,
  attemptAllowed: "Unlimited",
  questions: fakeQuestions.slice(0, 6),
};
