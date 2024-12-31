import { PageTopic } from "@/models/topic";
import SettingList from "../settings/setting-list";
import { updateTopic } from "@/services/topic";
import { toast } from "react-toastify";

interface Props {
  page: PageTopic;
  onPageChange?: (data: PageTopic) => void;
}
const TabSetting = ({ page, onPageChange }: Props) => {
  const handleUpdateSuccess = (data: PageTopic) => {
    toast.success("Update successfully");
    if (onPageChange) onPageChange(data);
  };
  const handleFail = (error: any) => {
    toast.error(error);
  };
  const handleUpdatePageSetting = (data: PageTopic) => {
    updateTopic(data, handleUpdateSuccess, handleFail);
  };
  return (
    <div>
      <h1 className="font-bold text-2xl text-orange-600">Edit settings</h1>
      <SettingList page={page} onSubmitPageSetting={handleUpdatePageSetting} />
    </div>
  );
};

export default TabSetting;
