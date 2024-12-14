import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Course } from "@/models/course";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  courses: Course[];
}
export default function AssignedTab({ courses }: Props) {
  const options = ["All courses", ...courses.map((course) => course.title)];
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
          <ChevronDown size={20} />
        </Button>
      </Combobox>
      {/* <ReviewList /> */}
    </div>
  );
}
