import React from "react";
import Message from "./message";
import { ChatMessage } from "@/models/message";

interface Props {
  message: ChatMessage;
}
export default function LeftMessage({ message }: Props) {
  return (
    <div className="w-full flex justify-start">
      <Message
        message={message}
        className="bg-gray-100 text-gray-700"
        tooltipSide="right"
      />
    </div>
  );
}
