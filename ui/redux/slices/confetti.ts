import { User } from "@/models/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const confettiSlice = createSlice({
  name: "confetti",
  initialState: {
    open: false,
  },
  reducers: {
    openConfetti: (state) => {
      state.open = true;
    },
    closeConfetti: (state) => {
      state.open = false;
    },
  },
});
const {
  reducer: ConfettiReducer,
  actions: { openConfetti, closeConfetti },
} = confettiSlice;

export { openConfetti, closeConfetti };
export default ConfettiReducer;
