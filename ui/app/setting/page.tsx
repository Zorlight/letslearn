import React from "react";
import SettingBoard from "./components/setting-board";

export default function SettingPage() {
  return (
    <div className="w-full p-5 space-y-4 bg-gray-50">
      <h5>Profile setting</h5>
      <SettingBoard />
    </div>
  );
}
