import { MeetingTopic } from "@/models/topic";
import React from "react";
import DataRow from "../detail/data-row";
import { Clock, Scroll, TextSelect } from "lucide-react";
import EditorDisplay from "@/lib/tinymce/editor-display";
import { format } from "date-fns";
import { Button } from "@/lib/shadcn/button";

interface Props {
  meeting: MeetingTopic;
}
export default function TabDetail({ meeting }: Props) {
  const { open, description } = meeting.data;
  const handleGetOpenText = (openISOString: string) => {
    const openDate = new Date(openISOString);
    return format(openDate, "EEEE, dd MMMM yyyy, h:mm a");
  };
  const openText = handleGetOpenText(open);
  return (
    <div className="flex flex-col gap-2">
      <DataRow label={<Clock className="text-gray-500" />}>
        <span className="font-bold">{openText}</span>
      </DataRow>
      <DataRow label={<TextSelect className="text-gray-500" />}>
        <EditorDisplay htmlString={description} />
      </DataRow>
      <div className="w-full flex items-center justify-center">
        <Button variant="cyan" className="w-fit rounded-lg font-bold">
          Join
        </Button>
      </div>
    </div>
  );
}
