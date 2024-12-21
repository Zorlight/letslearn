import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});
const {
  reducer: SidebarReducer,
  actions: { setSidebarOpen },
} = sidebarSlice;

export { setSidebarOpen };
export default SidebarReducer;
