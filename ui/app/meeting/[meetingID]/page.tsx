"use client"
import { MeetingPageComponent } from '@/app/meeting/[meetingID]/meeting';
import "@livekit/components-styles";
import * as React from 'react';

export default function MeetingPage({
  params,
}: {
  params: { meetingID: string };
}) {
  return (
    <MeetingPageComponent meetingID={params.meetingID}/>
  );
}
