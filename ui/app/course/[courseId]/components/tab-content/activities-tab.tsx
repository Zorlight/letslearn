import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { activityTopics } from "@/models/topic";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ActivityList from "./activities-tab/review-group/activity-list";

interface Props {}
export default function ActivitiesTab({}: Props) {
  const options = ["All activities", ...activityTopics];
  const [selectedChoice, setSelectedChoice] = useState<string>(options[0]);
  const handleChoiceChange = (choice: string) => {
    setSelectedChoice(choice);
  };
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
      <Combobox
        showSearch={false}
        initialValue={options[0]}
        renderItem={(item) => <span className="capitalize">{item}</span>}
        options={options}
        onChange={handleChoiceChange}
        className="w-[400px]"
        popoverClassName="w-[400px]"
      >
        <Button variant="outline" className="w-full justify-between">
          <span className="capitalize">{selectedChoice}</span>
          <ChevronDown className="ml-2 shrink-0" size={20} />
        </Button>
      </Combobox>
      <ActivityList />
    </div>
  );
}
