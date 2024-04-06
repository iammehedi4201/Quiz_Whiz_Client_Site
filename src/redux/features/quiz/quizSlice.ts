import { createSlice } from "@reduxjs/toolkit";

type Tquiz = {
  moduleId: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  marks: number;
};

type TSubmitedAnswer = {
  questionId: string;
  selectedOptionIndex: number;
};

type TInitialState = {
  quiz: Tquiz[];
  options: string[];
  questionCurrentIndex: number;
  submitedAnswer: TSubmitedAnswer[];
  isSubmitted: boolean;
  remainingTime: number;
};

const initialState: TInitialState = {
  quiz: [],
  options: [],
  questionCurrentIndex: 0,
  submitedAnswer: [],
  isSubmitted: false,
  remainingTime: 20,
};

type TAction = {
  payload: Tquiz;
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addQuiz: (state, action: TAction) => {
      state.quiz.push(action.payload);
    },
    setQuizOptions: (state, action) => {
      state.options.push(action.payload);
    },
    resetQuizForm: (state) => {
      state.options = [];
    },
    resetQuizPublish: (state) => {
      state.quiz = [];
    },
    setQuestionCurrentIndex: (state, action) => {
      state.questionCurrentIndex = action.payload;
    },
    setSubmitedAnswer: (state, action) => {
      if (action.payload.checked) {
        state.submitedAnswer.push(action.payload);
      } else {
        state.submitedAnswer = state.submitedAnswer.filter(
          (item) => item.questionId !== action.payload.questionId
        );
      }
    },
    setIsSubmitted: (state, action) => {
      state.isSubmitted = action.payload;
    },
    setRemainingTime: (state, action) => {
      state.remainingTime = action.payload;
    },
  },
});

export const {
  addQuiz,
  setQuizOptions,
  resetQuizForm,
  resetQuizPublish,
  setQuestionCurrentIndex,
  setSubmitedAnswer,
  setRemainingTime,
  setIsSubmitted,
} = quizSlice.actions;

export default quizSlice.reducer;
