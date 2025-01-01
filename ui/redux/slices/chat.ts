import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isChatBoxOpen: false,
    chatUserId: "",
  },
  reducers: {
    openChatBox: (state, action: PayloadAction<string>) => {
      state.isChatBoxOpen = true;
      state.chatUserId = action.payload;
    },
    closeChatBox: (state) => {
      state.isChatBoxOpen = false;
      state.chatUserId = "";
    },
  },
});
const {
  reducer: ChatReducer,
  actions: { openChatBox, closeChatBox },
} = chatSlice;

export { closeChatBox, openChatBox };
export default ChatReducer;
