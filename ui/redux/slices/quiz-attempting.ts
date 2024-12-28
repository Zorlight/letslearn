import { StudentResponse } from "@/models/student-response";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const quizAttemptingSlice = createSlice({
  name: "quizAttempting",
  initialState: {
    preview: null as StudentResponse | null,
  },
  reducers: {
    savePreviewQuizResponse: (
      state,
      action: PayloadAction<StudentResponse>
    ) => {
      state.preview = action.payload;
    },
  },
});
const {
  reducer: quizAttemptingReducer,
  actions: { savePreviewQuizResponse },
} = quizAttemptingSlice;

export { savePreviewQuizResponse };
export default quizAttemptingReducer;
