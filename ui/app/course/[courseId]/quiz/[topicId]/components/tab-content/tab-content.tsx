import { fakeQuestions } from "@/fake-data/question";
import { useTab } from "@/hooks/useTab";
import { Question } from "@/models/question";
import { QuizData } from "@/models/quiz";
import { StudentResponse } from "@/models/student-response";
import { QuizTopic } from "@/models/topic";
import { notFound } from "next/navigation";
import { useState } from "react";
import { Tab } from "../static-data";
import TabQuestion from "./tab-question";
import TabQuestionBank from "./tab-question-bank";
import TabQuiz from "./tab-quiz";
import TabResults from "./tab-results";
import TabSetting from "./tab-setting";

interface Props {
  className?: string;
  quiz: QuizTopic;
  onQuizChange?: (quiz: QuizTopic) => void;
}

const TabContent = ({ className, quiz, onQuizChange }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;
  const { data } = quiz;
  const { questions } = data as QuizData;
  const [questionsBank, setQuestionsBank] = useState<Question[]>(fakeQuestions);

  const [quizResponses, setQuizResponses] = useState<StudentResponse[]>([]);
  const [selectedQuizResponse, setSelectedQuizResponse] = useState<
    StudentResponse | undefined
  >();
  const handleQuestionBankChange = (questions: Question[]) => {
    setQuestionsBank(questions);
  };

  switch (selectedTab) {
    case Tab.QUIZ:
      return (
        <TabQuiz
          quiz={quiz}
          quizResponses={quizResponses}
          onQuizResponsesChange={setQuizResponses}
          onSelectQuizResponse={setSelectedQuizResponse}
          className={className}
        />
      );
    case Tab.SETTINGS:
      return <TabSetting quiz={quiz} onQuizChange={onQuizChange} />;
    case Tab.QUESTION:
      return (
        <TabQuestion
          quiz={quiz}
          questionsBank={questions}
          quizResponses={quizResponses}
        />
      );
    case Tab.QUESTION_BANK:
      return (
        <TabQuestionBank
          questions={questionsBank}
          onQuestionsChange={handleQuestionBankChange}
        />
      );
    case Tab.RESULTS:
      return <TabResults studentResponses={quizResponses} />;
    default:
      return notFound();
  }
};

export default TabContent;
