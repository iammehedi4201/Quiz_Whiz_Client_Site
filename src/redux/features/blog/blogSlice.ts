import { createSlice } from "@reduxjs/toolkit";

type TBlog = {
  title: string;
  content: string;
  moduleId: string;
};

type TInitialState = {
  blog: TBlog[];
};

const initialState: TInitialState = {
  blog: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.blog.push(action.payload);
    },
  },
});

export const { addBlog } = quizSlice.actions;

export default quizSlice.reducer;
