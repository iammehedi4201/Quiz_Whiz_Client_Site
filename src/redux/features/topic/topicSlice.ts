import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  topicId: string;
};

const initialState: TInitialState = {
  topicId: "",
};

const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    setSelectedTopic: (state, action) => {
      state.topicId = action.payload.topicId;
    },
  },
});

export const { setSelectedTopic } = stepperSlice.actions;

export default stepperSlice.reducer;
