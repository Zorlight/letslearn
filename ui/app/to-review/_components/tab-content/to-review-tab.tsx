import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ReviewList from "../review-group/review-list";

export default function ToReviewTab() {
  const options = ["All courses"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  return (
    <div className="flex flex-col items-center">
      <Combobox
        name="course"
        options={options}
        initialValue={options[0]}
        popoverClassName="min-w-[400px]"
      >
        <Button
          variant="outline"
          className="min-w-[400px] flex justify-between"
        >
          {selectedOption}
          <ChevronDown />
        </Button>
      </Combobox>
      <ReviewList />
    </div>
  );
}
