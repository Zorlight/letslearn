"use client";
import Rectangle from "@/components/ui/skeleton/rectangle";
import TabList from "@/components/ui/tab-list";
import PageLayout from "@/components/ui/util-layout/page-layout";
import React from "react";
import { iconMap, TopicType } from "@/models/topic";
import { TabProvider } from "@/provider/tab-provider";
import Line from "@/components/ui/skeleton/line";

interface Props {
  type: TopicType;
  tabs: string[];
}
export default function QuizSkeleton({ type, tabs }: Props) {
  const Icon = iconMap[type];
  return (
    <PageLayout className="relative bg-pink-50 !overflow-hidden">
      <TabProvider initTab={tabs[0]}>
        <div className="z-0 absolute top-0 w-full h-[250px] px-5 py-10 justify-center bg-gradient-to-br from-quiz via-[#751540] via-75% to-[#751540] shadow-[inset_4px_4px_20px_0px_#751540] text-white">
          <div className="w-full space-y-8">
            <div className="w-full px-5 flex flex-row gap-4">
              <Icon size={32} />
              <Line />
            </div>
            <TabList tabs={tabs} variant="white-text" />
          </div>
        </div>
        <div className="z-10 mt-[150px] flex w-full default-scrollbar p-5">
          <div className="w-full min-h-full bg-white rounded-lg shadow-md">
            <Rectangle className="w-full h-full" />
          </div>
        </div>
      </TabProvider>
    </PageLayout>
  );
}
