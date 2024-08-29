import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "./slices/profile";
import ConfettiReducer from "./slices/confetti";

export const store = configureStore({
  reducer: {
    profile: ProfileReducer,
    confetti: ConfettiReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
