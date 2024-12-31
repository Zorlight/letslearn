import { User } from "./user";

export type ChatMessage = {
  id: string;
  content: string;
  sender: User;
  time: string;
};
