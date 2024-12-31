import { ChatMessage } from "@/models/message";
import { fakeUser } from "./user";

const now = new Date();

export const fakeMessages: ChatMessage[] = [
  {
    id: "1",
    sender: fakeUser,
    content: "Hello",
    time: now.toISOString(),
  },
  {
    id: "2",
    sender: fakeUser,
    content: "Hello",
    time: now.toISOString(),
  },
  {
    id: "3",
    sender: fakeUser,
    content: "Hello",
    time: now.toISOString(),
  },
  {
    id: "4",
    sender: fakeUser,
    content: "Hello",
    time: now.toISOString(),
  },
];
