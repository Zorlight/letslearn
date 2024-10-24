"use client";
import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import { useState } from "react";
import AvailabilitySetting, {
  AvailabilitySettingForm,
} from "./setting-items/availability";
import GeneralSetting, { GeneralSettingForm } from "./setting-items/general";
import SubmissionTypeSetting, {
  SubmissionType,
  SubmissionTypeSettingForm,
} from "./submission-type";

const SettingList = () => {
  const [generalSetting, setGeneralSetting] = useState<GeneralSettingForm>({
    assignmentName: "",
    description: "",
    instuction: "",
  });
  const [availabilitySetting, setAvailabilitySetting] =
    useState<AvailabilitySettingForm>({
      allowSubmissionForm: {
        enabled: true,
        value: new Date().toISOString(),
      },
      dueDate: {
        enabled: true,
        value: new Date().toISOString(),
      },
      cutOffDate: {
        enabled: false,
        value: new Date().toISOString(),
      },
      remind: {
        enabled: true,
        value: new Date().toISOString(),
      },
    });

  const [submissionTypeSetting, setSubmissionTypeSetting] =
    useState<SubmissionTypeSettingForm>({
      submissionType: [SubmissionType.ONLINE_TEXT],
      wordLimit: {
        enabled: false,
        value: 0,
      },
      maximumFiles: null,
      maximumSize: "1 MB",
      acceptFileTypes: [],
    });

  //use for auto save setting and update the state when the show content is closed
  const handleGeneralSettingChange = (data: GeneralSettingForm) => {
    setGeneralSetting((prev) => ({ ...prev, ...data }));
  };

  const handleAvailabilitySettingChange = (data: AvailabilitySettingForm) => {
    setAvailabilitySetting((prev) => ({ ...prev, ...data }));
  };

  const handleSubmissionTypeSettingChange = (
    data: SubmissionTypeSettingForm
  ) => {
    setSubmissionTypeSetting((prev) => ({ ...prev, ...data }));
  };

  const titles = ["General", "Availability", "Submission Types"];
  const collapsibleContent = [
    <GeneralSetting
      key={1}
      initValue={generalSetting}
      onChange={handleGeneralSettingChange}
    />,
    <AvailabilitySetting
      key={2}
      initValue={availabilitySetting}
      onChange={handleAvailabilitySettingChange}
    />,
    <SubmissionTypeSetting
      key={3}
      initValue={submissionTypeSetting}
      onChange={handleSubmissionTypeSettingChange}
    />,
  ];

  return (
    <CollapsibleList titles={titles}>{collapsibleContent}</CollapsibleList>
  );
};

export default SettingList;
