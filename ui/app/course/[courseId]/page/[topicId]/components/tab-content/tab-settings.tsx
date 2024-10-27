import { Page } from "@/models/page";
import SettingList from "../settings/setting-list";

interface Props {
  page: Page;
  onPageChange?: (data: Page) => void;
}
const TabSetting = ({ page, onPageChange }: Props) => {
  return (
    <div>
      <h1 className="font-bold text-2xl text-orange-600">Edit settings</h1>
      <SettingList page={page} onSubmitPageSetting={onPageChange} />
    </div>
  );
};

export default TabSetting;
