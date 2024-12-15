"use client";
import { Button } from "@/lib/shadcn/button";
import EditorDisplay from "@/lib/tinymce/editor-display";
import { MeetingTopic } from "@/models/topic";
import { format } from "date-fns";
import { Clock, TextSelect } from "lucide-react";
import { useRouter } from "next/navigation";
import DataRow from "../detail/data-row";

interface Props {
  meeting: MeetingTopic;
}
export default function TabDetail({ meeting }: Props) {
  const router = useRouter();
  const { open, description } = meeting.data;
  const handleGetOpenText = (openISOString: string) => {
    const openDate = new Date(openISOString);
    return format(openDate, "EEEE, dd MMMM yyyy, h:mm a");
  };

  const handleStartMeeting = () => {
    router.push(`/meeting/${meeting.id}`);
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
        <Button
          variant="cyan"
          className="w-fit rounded-lg font-bold"
          onClick={handleStartMeeting}
        >
          Start meeting
        </Button>
      </div>
    </div>
  );
}
