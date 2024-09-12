"use client";
import IconBadge from "@/components/buttons/icon-badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/shadcn/accordion";
import { Button } from "@/lib/shadcn/button";
import { Card } from "@/lib/shadcn/card";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import CourseTopic from "./_components/course-topic";
import { course } from "./_components/fake-data";

const CourseIdPage = () => {
  const [showContent, setShowContent] = useState<string[]>([]);

  const handleSectionToggle = (index: number) => {
    let newShowContent;
    if (isShowContent(index))
      newShowContent = showContent.filter(
        (content) => content !== index.toString()
      );
    else newShowContent = [...showContent, index.toString()];
    setShowContent(newShowContent);
  };
  const handleMoveToSection = (e: any, index: number, sectionId: string) => {
    if (isShowContent(index)) e.stopPropagation();
  };
  const handleCollapseAll = () => {
    setShowContent([]);
  };
  const handleExpandAll = () => {
    let newShowContent = [];
    for (let i = 0; i < course.sections.length; i++) {
      newShowContent.push(i.toString());
    }
    setShowContent(newShowContent);
  };
  const isAllCollapsed = showContent.every((content) => !content);
  const isShowContent = (index: number) =>
    showContent.includes(index.toString());

  useEffect(() => {
    handleCollapseAll();
  }, []);

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-bold line-clamp-1 text-2xl text-purple-700">
          {course.title}
        </h1>
        <div className="w-full flex justify-end">
          <Button
            variant="link"
            onClick={isAllCollapsed ? handleExpandAll : handleCollapseAll}
          >
            {isAllCollapsed ? "Expand all" : "Collapse all"}
          </Button>
        </div>
        <Accordion
          value={showContent}
          type="multiple"
          className="w-full flex flex-col gap-4"
        >
          {course.sections.map((section, index) => {
            return (
              <section key={index} id={`section-${section.id}`}>
                <Card className="px-4 rounded-xl">
                  <AccordionItem value={index.toString()}>
                    <AccordionTrigger>
                      <div
                        className="w-fit flex flex-row items-center justify-start gap-4 cursor-pointer"
                        onClick={() => handleSectionToggle(index)}
                      >
                        <IconBadge
                          icon={<ChevronRight />}
                          size="sm"
                          className={cn(
                            showContent.includes(index.toString()) &&
                              "rotate-90"
                          )}
                          onClick={() => handleSectionToggle(index)}
                        />
                        <p
                          className="font-bold text-xl m-0 select-none text-indigo-950"
                          onClick={(e) =>
                            handleMoveToSection(e, index, section.id)
                          }
                        >
                          {section.title}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-4">
                        {section.topics.map((topic, index) => (
                          <CourseTopic key={index} topic={topic} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              </section>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default CourseIdPage;
