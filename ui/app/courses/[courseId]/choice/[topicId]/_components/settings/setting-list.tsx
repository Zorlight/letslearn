"use client";
import { useState } from "react";
import GeneralSetting, { GeneralSettingForm } from "./setting-items/general";
import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import OptionsSetting, { OptionsSettingForm } from "./setting-items/options";

const SettingList = () => {
  const [generalSetting, setGeneralSetting] = useState<GeneralSettingForm>({
    choiceName: "",
    description: "",
  });
  const [optionsSetting, setOptionsSetting] = useState<OptionsSettingForm>({
    allowUpdateChoice: false,
    allowMultipleChoice: false,
    limitResponses: false,
    showAvailableSpace: false,
    options: [
      {
        option: "First option",
        limit: 0,
      },
      {
        option: "Second option",
        limit: 0,
      },
    ],
  });

  //use for auto save setting and update the state when the show content is closed
  const handleGeneralSettingChange = (data: GeneralSettingForm) => {
    setGeneralSetting((prev) => ({ ...prev, ...data }));
  };

  const handleOptionsSettingChange = (data: OptionsSettingForm) => {
    setOptionsSetting((prev) => ({ ...prev, ...data }));
  };

  const titles = ["General", "Options"];
  const collapsibleContent = [
    <GeneralSetting
      initValue={generalSetting}
      onChange={handleGeneralSettingChange}
    />,
    <OptionsSetting
      initValue={optionsSetting}
      onChange={handleOptionsSettingChange}
    />,
  ];

  return (
    <CollapsibleList titles={titles}>{collapsibleContent}</CollapsibleList>
  );
};

export default SettingList;
