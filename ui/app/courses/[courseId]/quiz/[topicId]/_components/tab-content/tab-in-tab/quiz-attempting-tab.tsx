"use client";
import { fakeQuestions } from "@/fake-data/question";
import { Button } from "@/lib/shadcn/button";
import { ReactNode, useState } from "react";
import QuestionDisplay from "../../quiz-attempting/question-display";
import { cn } from "@/lib/utils";
import { Card } from "@/lib/shadcn/card";
import QuestionBlock from "../../quiz-attempting/navigation/question-block";
import { TabInTab } from "../../static-data";
import BackwardButtonIconText from "../_components/backward-button-icon-text";
import {
  colorAnnotations,
  symbolAnnotations,
} from "../_components/static-data";

interface Props {
  onTabInTabChange?: (tab: TabInTab) => void;
  className?: string;
}
const QuizAttemptingTab = ({ className, onTabInTabChange }: Props) => {
  const totalQuestions = fakeQuestions.length;
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [flags, setFlags] = useState<boolean[]>(fakeQuestions.map(() => false));
  const [questions, setQuestions] = useState(fakeQuestions);
  const handleFlagChange = (index: number) => {
    const newFlags = [...flags];
    newFlags[index] = !newFlags[index];
    setFlags(newFlags);
  };
  const scrollToQuestion = (index: number) => {
    if (typeof window === undefined) return;
    const id = `question-${index + 1}`;
    console.log(id);
    const topPositionOfSection = document!.getElementById(id)!.offsetTop;
    console.log(id, " top: ", topPositionOfSection);
    const navbarHeight =
      document!.getElementById("course-navbar")!.offsetHeight;

    // Scroll with adjustment for the navbar height
    window.scrollTo({
      top: topPositionOfSection + 154,
      behavior: "smooth",
    });
  };
  const handleGoBack = () => {
    if (onTabInTabChange) onTabInTabChange(TabInTab.MAIN_TAB);
  };
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 h-full max-w-[320px] w-1/3">
        <div className="sticky top-24">
          <BackwardButtonIconText onClick={handleGoBack} />
          <Card className="p-4 space-y-4">
            <h5 className="text-orange-600">Annotation table</h5>
            <h6 className="text-pink-600">Symbol</h6>
            <div className="flex flex-col gap-2">
              {symbolAnnotations.map((annotation, index) => (
                <SymbolAnnotation
                  key={index}
                  symbol={annotation.symbol}
                  description={annotation.description}
                />
              ))}
            </div>
            <h6 className="text-violet-600">Color</h6>
            <div className="flex flex-col gap-2">
              {colorAnnotations.map((annotation, index) => (
                <ColorAnnotation
                  key={index}
                  colorClassName={annotation.colorClassName}
                  description={annotation.description}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className={cn("flex flex-col gap-10 pb-48", className)}>
        {questions.map((question, index) => (
          <QuestionDisplay
            key={index}
            questionIndex={index}
            totalQuestions={totalQuestions}
            question={question}
            showCorrectAnswer={showCorrectAnswer}
            isFlagged={flags[index]}
            onFlagChange={() => handleFlagChange(index)}
          />
        ))}
        <Button
          variant="default"
          onClick={() => setShowCorrectAnswer(!showCorrectAnswer)}
        >
          {showCorrectAnswer ? "Hide" : "Show"} correct answer
        </Button>
      </div>
      <div className="absolute right-0 top-0 h-full max-w-[320px] w-1/3 ">
        <Card className="sticky top-24 p-4 space-y-2">
          <h5 className="text-orange-600">Quiz navigation</h5>
          <div className="flex gap-2">
            {questions.map((_, index) => (
              <QuestionBlock
                key={index}
                questionIndex={index}
                isFlagged={flags[index]}
                onClick={() => scrollToQuestion(index)}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

interface SymbolAnnotationProps {
  symbol: ReactNode;
  description: string;
}
const SymbolAnnotation = ({ symbol, description }: SymbolAnnotationProps) => {
  return (
    <div className="flex flex-row gap-3">
      {symbol}
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
};
interface ColorAnnotationProps {
  colorClassName: string;
  description: string;
}
const ColorAnnotation = ({
  colorClassName,
  description,
}: ColorAnnotationProps) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <div className={cn("h-4 w-4", colorClassName)}></div>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
};

export default QuizAttemptingTab;
