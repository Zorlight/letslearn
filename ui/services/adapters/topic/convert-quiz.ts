import { Question, QuestionType } from "@/models/question";
import { QuizTopic } from "@/models/topic";
import { convertChoiceQuestionToRequestData } from "../question/choice-question";
import { convertShortAnswerQuestionToRequestData } from "../question/short-answer-question";
import { convertTrueFalseQuestionToRequestData } from "../question/true-false-question";
import { convertQuestionFromResponseData } from "../question/question";

const removeTempIdInQuestions = (questions: Question[]) => {
  return questions.map((question) => {
    if (question.type === QuestionType.CHOICE)
      return convertChoiceQuestionToRequestData(question);
    else if (question.type === QuestionType.SHORT_ANSWER)
      return convertShortAnswerQuestionToRequestData(question);
    else if (question.type === QuestionType.TRUE_FALSE)
      return convertTrueFalseQuestionToRequestData(question);
    return question;
  });
};

export const convertQuizToRequestData = (quiz: QuizTopic) => {
  const { id, data } = quiz;
  let reqData = {
    ...quiz,
    id: id.length === 4 ? null : id,
  };
  if (!data) return reqData;

  const { questions } = data;
  const convertedData = {
    ...data,
    questions: removeTempIdInQuestions(questions),
  };

  return {
    ...reqData,
    data: JSON.stringify(convertedData),
  };
};

export const convertQuizFromResponseData = (quiz: any): QuizTopic => {
  const parsedData = JSON.parse(quiz.data);
  const convertedQuestions = parsedData.questions.map((q: any) =>
    convertQuestionFromResponseData(q)
  );

  let res = {
    ...quiz,
    data: {
      ...parsedData,
      questions: convertedQuestions,
    },
  };

  return res as QuizTopic;
};
