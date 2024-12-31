"use client";
import TabList from "@/components/ui/tab-list";
import React, { useState } from "react";
import { Tab } from "./static-data";
import { TabProvider } from "@/provider/tab-provider";
import TabContent from "./setting-tab/tab-content";

export default function SettingBoard() {
  const tabs = Object.values(Tab);
  return (
    <TabProvider initTab={Tab.PROFILE}>
      <div className="w-full pb-5 rounded-lg border-[0.5px] border-gray-400 bg-white shadow-md">
        <TabList tabs={tabs} />
        <TabContent />
      </div>
    </TabProvider>
  );
}
