import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "./slices/profile";
import ConfettiReducer from "./slices/confetti";
import BreadcrumbReducer from "./slices/breadcrumb";
import quizAttemptingReducer from "./slices/quiz-attempting";
import CoursesReducer from "./slices/course";
import SidebarReducer from "./slices/sidebar";

export const store = configureStore({
  reducer: {
    profile: ProfileReducer,
    confetti: ConfettiReducer,
    breadcrumb: BreadcrumbReducer,
    quizAttempting: quizAttemptingReducer,
    courses: CoursesReducer,
    sidebar: SidebarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
