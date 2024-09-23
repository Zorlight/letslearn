"use client";
import React, { useMemo, useState } from "react";
import { colorMap, iconMap } from "../../_components/topic-map";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import TabList from "@/components/ui/tab-list";
import { Tab } from "./_components/static-data";
import TabContent from "./_components/tab-content/tab-content";
import { useTab } from "@/hooks/useTab";
import { fakeCourses } from "@/fake-data/course";
import { fakeTopics } from "@/fake-data/topic";
import { ChoiceTopic, TopicType } from "@/models/topic";
import { Course } from "@/models/course";
import { TabProvider } from "@/provider/tab-provider";

interface Props {
  params: {
    courseId: string;
    topicId: string;
  };
}
const ChoiceIdPage = ({ params }: Props) => {
  const { topicId, courseId } = params;

  //get course by id
  const course = useMemo(() => {
    return fakeCourses.find((course) => course.id === courseId) as Course;
  }, [courseId]);

  //get topics by id
  const topic = useMemo(() => {
    return fakeTopics.find(
      (topic) => topic.id === topicId && topic.type === TopicType.CHOICE
    ) as ChoiceTopic;
  }, [topicId]);

  if (!topic) return notFound();
  const sectionId = topic.sectionId;
  if (!course) return notFound();
  const section = course.sections.find((section) => section.id === sectionId);
  if (!section) return notFound();

  const Icon = iconMap.choice;
  const color = colorMap.choice;
  const tabs = Object.values(Tab);

  return (
    <TabProvider initTab={Tab.CHOICE}>
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-row items-center gap-2 mb-4">
            <Link
              href={`/courses/${course.id}`}
              className="text-cyan-600 hover:underline underline-offset-2 decoration-1"
            >
              {course.title}
            </Link>
            <span className="text-slate-600">/</span>
            <Link
              href={`/courses/${course.id}#section-${section.id}`}
              className="text-cyan-600 hover:underline underline-offset-2 decoration-1"
            >
              {section.title}
            </Link>
            <span className="text-slate-600">/</span>
            <span>{topic.title}</span>
          </div>
          <div className={cn("flex flex-row items-center gap-4", color)}>
            <Icon size={24} />
            <h1 className="text-2xl font-bold">{topic.title}</h1>
          </div>
          <TabList tabs={tabs} className="mt-4" />
        </div>
        <TabContent className="max-w-3xl mx-auto" />
      </div>
    </TabProvider>
  );
};

export default ChoiceIdPage;
