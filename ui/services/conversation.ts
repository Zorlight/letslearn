import { POST } from "@/lib/http-handle/http-handle";
import { Conversation } from "@/models/conversation";

export const getConversation = (
  chatUserId: string,
  onSuccess: (data: Conversation) => void,
  onFail: (err?: any) => void
) => {
  POST(`/user/conversation?otherUserId=${chatUserId}`, {}, onSuccess, onFail);
};
