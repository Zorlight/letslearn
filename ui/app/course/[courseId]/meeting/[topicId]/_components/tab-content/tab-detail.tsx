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
import { useState } from "react";
import { Spinner } from "@nextui-org/spinner";

interface Props {
  meeting: MeetingTopic;
}
export default function TabDetail({ meeting }: Props) {
  const user = useAppSelector((state) => state.profile.value);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { open, description } = meeting.data;
  const handleGetOpenText = (openISOString: string) => {
    const openDate = new Date(openISOString);
    return format(openDate, "EEEE, dd MMMM yyyy, h:mm a");
  };

  const handleStartMeetingSuccess = () => {
    setLoading(false);
    router.push(`/meeting/${meeting.id}`);
  };
  const handleStartMeetingFail = () => {
    router.push(`/meeting/${meeting.id}`);
  };
  const handleStartMeeting = () => {
    setLoading(true);
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
            disabled={loading}
            className="w-[120px] rounded-lg font-bold"
            onClick={handleStartMeeting}
          >
            {loading && <Spinner size="sm" color="white" />}
            {!loading && <span>Start meeting</span>}
          </Button>
        )}
        {user.role === Role.STUDENT && (
          <Button
            variant="cyan"
            disabled={loading}
            className="w-[120px] rounded-lg font-bold"
            onClick={handleJoinMeeting}
          >
            {loading && <Spinner size="sm" color="white" />}
            {!loading && <span>Join meeting</span>}
          </Button>
        )}
      </div>
    </div>
  );
}
