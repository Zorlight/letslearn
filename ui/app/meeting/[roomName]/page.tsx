"use client"
import { MeetingPageComponent } from '@/app/meeting/[roomName]/meeting';
import "@livekit/components-styles";
import * as React from 'react';

export default function MeetingPage({
  params,
}: {
  params: { roomName: string };
}) {
  return (
    <MeetingPageComponent roomName={params.roomName}/>
  );
}
