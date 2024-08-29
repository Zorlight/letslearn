import { User } from "@/models/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    value: null as User | null,
    isLogin: false,
  },
  reducers: {
    setProfile: (state, action: PayloadAction<User | null>) => {
      state.value = action.payload;
      state.isLogin = action.payload != null;
    },
  },
});
const {
  reducer: ProfileReducer,
  actions: { setProfile },
} = profileSlice;

export { setProfile };
export default ProfileReducer;
