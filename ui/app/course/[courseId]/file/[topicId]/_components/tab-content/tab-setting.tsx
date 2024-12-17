import { AssignmentTopic, FileTopic } from "@/models/topic";
import SettingList from "../settings/setting-list";
import { updateTopic } from "@/services/topic";
import { toast } from "react-toastify";

interface Props {
  topic: FileTopic;
  onTopicChange?: (data: FileTopic) => void;
}
const TabSetting = ({ topic, onTopicChange }: Props) => {
  const handleUpdateTopicSuccess = (data: FileTopic) => {
    if (onTopicChange) onTopicChange(data);
    toast.success("Update topic successfully");
  };
  const handleUpdateTopicFail = (error: any) => {
    toast.error(error);
  };
  const handleSubmitTopicSetting = (data: FileTopic) => {
    console.log("data", data);
    updateTopic(data, handleUpdateTopicSuccess, handleUpdateTopicFail);
  };

  return (
    <div>
      <h1 className="font-bold text-2xl text-orange-500">Edit settings</h1>
      <SettingList
        topic={topic}
        onSubmitFileSetting={handleSubmitTopicSetting}
      />
    </div>
  );
};

export default TabSetting;
