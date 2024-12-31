import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isChatBoxOpen: false,
  },
  reducers: {
    openChatBox: (state) => {
      state.isChatBoxOpen = true;
    },
    closeChatBox: (state) => {
      state.isChatBoxOpen = false;
    },
  },
});
const {
  reducer: ChatReducer,
  actions: { openChatBox, closeChatBox },
} = chatSlice;

export { closeChatBox, openChatBox };
export default ChatReducer;
