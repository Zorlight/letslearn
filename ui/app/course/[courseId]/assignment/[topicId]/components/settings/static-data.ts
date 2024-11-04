import { AvailabilitySettingForm } from "./setting-items/availability";
import { GeneralSettingForm } from "./setting-items/general";
import { SubmissionSettingForm } from "./setting-items/submission";

export const defaultGeneralSetting: GeneralSettingForm = {
  name: "Quiz 1",
  description: "This is a quiz",
};

export const defaultAvailabilitySetting: AvailabilitySettingForm = {
  open: {
    enabled: true,
    value: new Date().toISOString(),
  },
  close: {
    enabled: true,
    value: new Date().toISOString(),
  },
  remindToGrade: {
    enabled: true,
    value: new Date().toISOString(),
  },
};

export const defaultSubmissionSetting: SubmissionSettingForm = {
  submissionType: ["file"],
  wordLimit: {
    enabled: false,
    value: 0,
  },
  maximumFile: {
    enabled: false,
    value: 0,
  },
  maximumFileSize: {
    enabled: false,
    value: "1 MB",
  },
};
