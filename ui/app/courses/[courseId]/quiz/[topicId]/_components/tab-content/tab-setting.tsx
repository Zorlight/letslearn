import { Quiz } from "@/models/quiz";
import SettingList from "../settings/setting-list";

interface Props {
  quiz: Quiz;
  onQuizChange?: (data: Quiz) => void;
}
const TabSetting = ({ quiz, onQuizChange }: Props) => {
  return (
    <div>
      <h1 className="font-bold text-2xl text-orange-600">Edit settings</h1>
      <SettingList quiz={quiz} onSubmitQuizSetting={onQuizChange} />
    </div>
  );
};

export default TabSetting;
