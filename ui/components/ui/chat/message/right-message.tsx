import React from "react";
import Message from "./message";
import { ChatMessage } from "@/models/message";

interface Props {
  message: ChatMessage;
}
export default function RightMessage({ message }: Props) {
  return (
    <div className="w-full flex justify-end">
      <Message
        message={message}
        className="bg-blue-700 text-white"
        tooltipSide="left"
      />
    </div>
  );
}
