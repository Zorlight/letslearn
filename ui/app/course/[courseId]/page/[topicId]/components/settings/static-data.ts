import { ContentSettingForm } from "./setting-items/content";
import { GeneralSettingForm } from "./setting-items/general";

export const defaultGeneralSetting: GeneralSettingForm = {
  name: "Astronomy concepts",
  description: "This is a lesson on astronomy",
};

export const defaultContentSetting: ContentSettingForm = {
  content:
    "Astronomy is the study of celestial objects and phenomena that originate outside the Earth's atmosphere.",
};
