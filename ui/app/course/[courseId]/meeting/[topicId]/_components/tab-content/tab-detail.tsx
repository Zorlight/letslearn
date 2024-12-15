"use client";
import { Button } from "@/lib/shadcn/button";
import EditorDisplay from "@/lib/tinymce/editor-display";
import { MeetingTopic } from "@/models/topic";
import { format } from "date-fns";
import { Clock, TextSelect } from "lucide-react";
import { useRouter } from "next/navigation";
import DataRow from "../detail/data-row";
import { useAppSelector } from "@/redux/hooks";
import { Role } from "@/models/user";
import { startMeeting } from "@/services/meeting";
import { toast } from "react-toastify";

interface Props {
  meeting: MeetingTopic;
}
export default function TabDetail({ meeting }: Props) {
  const user = useAppSelector((state) => state.profile.value);
  const router = useRouter();
  const { open, description } = meeting.data;
  const handleGetOpenText = (openISOString: string) => {
    const openDate = new Date(openISOString);
    return format(openDate, "EEEE, dd MMMM yyyy, h:mm a");
  };

  const handleStartMeetingSuccess = () => {
    router.push(`/meeting/${meeting.id}`);
  };
  const handleStartMeetingFail = () => {
    toast.error("Failed to start meeting");
    router.push(`/meeting/${meeting.id}`);
  };
  const handleStartMeeting = () => {
    startMeeting(meeting.id, handleStartMeetingSuccess, handleStartMeetingFail);
  };
  const handleJoinMeeting = () => {
    router.push(`/meeting/${meeting.id}`);
  };
  const openText = handleGetOpenText(open);
  if (!user) return null;
  return (
    <div className="flex flex-col gap-2">
      <DataRow label={<Clock className="text-gray-500" />}>
        <span className="font-bold">{openText}</span>
      </DataRow>
      <DataRow label={<TextSelect className="text-gray-500" />}>
        <EditorDisplay htmlString={description} />
      </DataRow>
      <div className="w-full flex items-center justify-center">
        {user.role === Role.TEACHER && (
          <Button
            variant="cyan"
            className="w-fit rounded-lg font-bold"
            onClick={handleStartMeeting}
          >
            Start meeting
          </Button>
        )}
        {user.role === Role.STUDENT && (
          <Button
            variant="cyan"
            className="w-fit rounded-lg font-bold"
            onClick={handleJoinMeeting}
          >
            Join meeting
          </Button>
        )}
      </div>
    </div>
  );
}
