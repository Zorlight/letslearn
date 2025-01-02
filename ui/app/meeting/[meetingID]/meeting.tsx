"use client";
import { ConnectionDetails } from "@/app/meeting/[meetingID]/types";
import {
  AudioConference,
  formatChatMessageLinks,
  LiveKitRoom,
  LocalUserChoices,
  PreJoin,
  VideoConference,
} from "@/components/meeting/livekit";
import GLOBAL from "@/global";
import {
  RoomOptions,
  VideoCodec,
  VideoPresets,
  Room,
  RoomConnectOptions,
} from "livekit-client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export function MeetingPageComponent(props: { meetingID: string }) {
  const [preJoinChoices, setPreJoinChoices] = React.useState<
    LocalUserChoices | undefined
  >(undefined);
  const preJoinDefaults = React.useMemo(() => {
    return {
      username: "",
      videoEnabled: true,
      audioEnabled: true,
    };
  }, []);
  const [connectionDetails, setConnectionDetails] = React.useState<
    ConnectionDetails | undefined
  >(undefined);

  const handlePreJoinSubmit = React.useCallback(
    async (values: LocalUserChoices) => {
      setPreJoinChoices(values);
      const url = new URL(`/v1/meeting/${props.meetingID}`, GLOBAL.MEETING_URL);
      url.searchParams.append("name", values.username);
      const connectionDetailsResp = await fetch(url.toString());
      const connectionDetailsData = await connectionDetailsResp.json();
      setConnectionDetails(connectionDetailsData);
    },
    []
  );
  const handlePreJoinError = React.useCallback(
    (e: any) => console.error(e),
    []
  );

  return (
    <main data-lk-theme="default">
      {connectionDetails === undefined || preJoinChoices === undefined ? (
        <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-lg">
          <PreJoin
            defaults={preJoinDefaults}
            onSubmit={handlePreJoinSubmit}
            onError={handlePreJoinError}
          />
        </div>
      ) : (
        <VideoConferenceComponent
          connectionDetails={connectionDetails}
          userChoices={preJoinChoices}
          meetingID={props.meetingID}
        />
      )}
    </main>
  );
}

function VideoConferenceComponent(props: {
  userChoices: LocalUserChoices;
  connectionDetails: ConnectionDetails;
  meetingID: string;
}) {
  const roomOptions = React.useMemo((): RoomOptions => {
    let videoCodec: VideoCodec = "h264";

    return {
      videoCaptureDefaults: {
        deviceId: props.userChoices.videoDeviceId ?? undefined,
        resolution: VideoPresets.h1080,
      },
      publishDefaults: {
        dtx: false,
        videoSimulcastLayers: [VideoPresets.h540, VideoPresets.h216],
        red: true,
        videoCodec,
      },
      audioCaptureDefaults: {
        deviceId: props.userChoices.audioDeviceId ?? undefined,
      },
      adaptiveStream: { pixelDensity: "screen" },
      dynacast: true,
      e2ee: undefined,
    };
  }, [props.userChoices]);

  const room = React.useMemo(() => new Room(roomOptions), []);

  const connectOptions = React.useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true,
    };
  }, []);

  const router = useRouter();
  const [courseId, setCourseId] = React.useState<string>();

  const handleOnLeave = React.useCallback(() => {
    if (courseId) {
      localStorage.removeItem("courseId");
      router.push(`/course/${courseId}/meeting/${props.meetingID}`);
    } else router.push("/home");
  }, [router, courseId, props.meetingID]);

  useEffect(() => {
    const storageCourseId = localStorage.getItem("courseId");
    if (storageCourseId) setCourseId(storageCourseId);
  }, []);

  return (
    <div className="h-screen w-screen">
      <LiveKitRoom
        room={room}
        token={props.connectionDetails.participantToken}
        serverUrl={props.connectionDetails.serverUrl}
        connectOptions={connectOptions}
        video={props.userChoices.videoEnabled}
        audio={props.userChoices.audioEnabled}
        onDisconnected={handleOnLeave}
      >
        <VideoConference
          chatMessageFormatter={formatChatMessageLinks}
          MeetingID={props.meetingID}
        />
      </LiveKitRoom>
    </div>
  );
}
