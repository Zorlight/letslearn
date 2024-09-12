"use client";
import React, { useMemo, useState } from "react";
import { topics } from "../../_components/fake-data";
import { colorMap, iconMap } from "../../_components/topic-map";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { course } from "../../_components/fake-data";
import Link from "next/link";
import TabList from "@/components/ui/tab-list";
import { Tab } from "./_components/static-data";
import TabContent from "./_components/tab-content/tab-content";

interface Props {
  params: {
    courseId: string;
    topicId: string;
  };
}
const QuizIdPage = ({ params }: Props) => {
  const { topicId, courseId } = params;
  const topic = topics.find((topic) => topic.id === topicId);

  const [selectedTab, setSelectedTab] = useState<string>(Tab.QUIZ);
  const handleTabSelected = (tab: string) => {
    setSelectedTab(tab);
  };

  if (!topic) return notFound();
  const sectionId = topic.sectionId;
  if (!course) return notFound();
  const section = course.sections.find((section) => section.id === sectionId);
  if (!section) return notFound();

  const Icon = iconMap.quiz;
  const color = colorMap.quiz;
  const tabs = Object.values(Tab);

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-row items-center gap-2 mb-4">
          <MiniLink href={`/courses/${course.id}`}>{course.title}</MiniLink>
          <span className="text-slate-600">/</span>
          <MiniLink href={`/courses/${course.id}#section-${section.id}`}>
            {section.title}
          </MiniLink>
          <span className="text-slate-600">/</span>
          <MiniLink>{topic.title}</MiniLink>
        </div>
        <div className={cn("flex flex-row items-center gap-4", color)}>
          <Icon size={24} />
          <h1 className="text-2xl font-bold">{topic.title}</h1>
        </div>
        <TabList
          tabs={tabs}
          selectedTab={selectedTab}
          className="mt-4"
          onSelected={handleTabSelected}
        />
      </div>
      <TabContent selectedTab={selectedTab} className="max-w-3xl mx-auto" />
    </div>
  );
};

interface MiniLinkProps {
  href?: string;
  children: React.ReactNode;
}
const MiniLink = ({ href, children }: MiniLinkProps) => {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className="text-cyan-600 hover:underline underline-offset-2 decoration-1 cursor-pointer"
        >
          {children}
        </Link>
      ) : (
        <div className="text-indigo-700 underline underline-offset-2 decoration-1 cursor-default">
          {children}
        </div>
      )}
    </>
  );
};

export default QuizIdPage;
