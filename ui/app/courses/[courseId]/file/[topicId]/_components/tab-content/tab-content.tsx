import React from "react";
import { Tab } from "../static-data";
import TabSetting from "./tab-setting";
import TabFile from "./tab-file";

interface Props {
  selectedTab: string;
}
const TabContent = ({ selectedTab }: Props) => {
  switch (selectedTab) {
    case Tab.FILE:
      return <TabFile />;
    case Tab.SETTING:
      return <TabSetting />;
    case Tab.MORE:
      return <div></div>;
    default:
      return <div></div>;
  }
};

export default TabContent;
