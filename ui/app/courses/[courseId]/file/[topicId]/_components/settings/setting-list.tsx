"use client";
import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import { useState } from "react";
import GeneralSetting, { GeneralSettingForm } from "./setting-items/general";

const SettingList = () => {
  const [generalSetting, setGeneralSetting] = useState<GeneralSettingForm>({
    name: "Assignment 1",
    description: "This is the first assignment",
    selectedFiles: [],
  });

  //use for auto save setting and update the state when the show content is closed
  const handleGeneralSettingChange = (data: GeneralSettingForm) => {
    setGeneralSetting((prev) => ({ ...prev, ...data }));
  };
  const titles = ["General"];
  const collapsibleContent = [
    <GeneralSetting
      initValue={generalSetting}
      onChange={handleGeneralSettingChange}
    />,
  ];

  return (
    <CollapsibleList titles={titles}>{collapsibleContent}</CollapsibleList>
  );
};

export default SettingList;
