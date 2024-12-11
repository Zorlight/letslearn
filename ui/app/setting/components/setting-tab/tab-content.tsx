import { useTab } from "@/hooks/useTab";
import React from "react";
import { Tab } from "../static-data";
import ProfileTab from "./profile-tab";
import PasswordTab from "./password-tab";

export default function TabContent() {
  const { selectedTab, handleTabSelected } = useTab<Tab>();
  switch (selectedTab) {
    case Tab.PROFILE:
      return (
        <Layout>
          <ProfileTab />
        </Layout>
      );
    case Tab.PASSWORD:
      return (
        <Layout>
          <PasswordTab />
        </Layout>
      );
    default:
      return null;
  }
}

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <div className="w-full p-6">{children}</div>;
};
