"use client";
import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import { useState } from "react";
import { GradingMethod, TimeLimitType } from "../static-data";
import GeneralSetting, { GeneralSettingForm } from "./setting-items/general";
import GradeSetting, { GradeSettingForm } from "./setting-items/grade";
import TimingSetting, { TimingSettingForm } from "./setting-items/timing";

const SettingList = () => {
  const [generalSetting, setGeneralSetting] = useState<GeneralSettingForm>({
    name: "Quiz 1",
    description: "This is a quiz",
  });
  const [timingSetting, setTimingSetting] = useState<TimingSettingForm>({
    open: {
      enabled: true,
      value: new Date().toISOString(),
    },
    close: {
      enabled: true,
      value: new Date().toISOString(),
    },
    timeLimit: {
      enabled: false,
      value: 0,
      unit: TimeLimitType.MINUTES,
    },
  });

  const [gradeSetting, setGradeSetting] = useState<GradeSettingForm>({
    gradeToPass: 5,
    gradingMethod: GradingMethod.HIGHEST_GRADE,
    attemptAllowed: "Unlimited",
  });

  //use for auto save setting and update the state when the show content is closed
  const handleGeneralSettingChange = (data: GeneralSettingForm) => {
    setGeneralSetting((prev) => ({ ...prev, ...data }));
  };

  const handleTimingSettingChange = (data: TimingSettingForm) => {
    setTimingSetting((prev) => ({ ...prev, ...data }));
  };

  const handleGradeSettingChange = (data: GradeSettingForm) => {
    setGradeSetting((prev) => ({ ...prev, ...data }));
  };

  const titles = ["General", "Timing", "Grade"];

  return (
    <CollapsibleList titles={titles}>
      <GeneralSetting
        initValue={generalSetting}
        onChange={handleGeneralSettingChange}
      />
      <TimingSetting
        initValue={timingSetting}
        onChange={handleTimingSettingChange}
      />
      <GradeSetting
        initValue={gradeSetting}
        onChange={handleGradeSettingChange}
      />
    </CollapsibleList>
  );
};

export default SettingList;
