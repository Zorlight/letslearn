import { StudentResponse } from "@/models/student-response";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const quizAttemptingSlice = createSlice({
  name: "quizAttempting",
  initialState: {
    savedQuizResponse: null as StudentResponse | null,
  },
  reducers: {
    saveQuizResponse: (state, action: PayloadAction<StudentResponse>) => {
      state.savedQuizResponse = action.payload;
    },
  },
});
const {
  reducer: quizAttemptingReducer,
  actions: { saveQuizResponse },
} = quizAttemptingSlice;

export { saveQuizResponse };
export default quizAttemptingReducer;
