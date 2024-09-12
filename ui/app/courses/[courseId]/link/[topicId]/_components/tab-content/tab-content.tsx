import React from "react";
import { Tab } from "../static-data";
import TabUrl from "./tab-url";
import TabSetting from "./tab-setting";

interface Props {
  selectedTab: string;
}
const TabContent = ({ selectedTab }: Props) => {
  switch (selectedTab) {
    case Tab.URL:
      return <TabUrl />;
    case Tab.SETTING:
      return <TabSetting />;
    case Tab.MORE:
      return <div></div>;
    default:
      return <div></div>;
  }
};

export default TabContent;
