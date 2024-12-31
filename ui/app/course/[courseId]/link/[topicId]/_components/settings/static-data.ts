import { nanoid } from "@reduxjs/toolkit";
import { GeneralSettingForm } from "./setting-items/general";

export const defaultCloudinaryFile = {
  id: nanoid(4),
  name: "",
  downloadUrl: "",
  displayUrl: "",
};

export const defaultGeneralSetting: GeneralSettingForm = {
  title: "Assignment",
  url: "",
  description: "",
};
