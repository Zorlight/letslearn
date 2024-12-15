import { Course } from "@/models/course";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    value: [] as Course[],
  },
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.value = action.payload;
    },
  },
});
const {
  reducer: CoursesReducer,
  actions: { setCourses },
} = coursesSlice;

export { setCourses };
export default CoursesReducer;
