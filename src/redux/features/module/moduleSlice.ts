import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  moduleTitle: string;
  moduleId: string;
};

const initialState: TInitialState = {
  moduleTitle: "",
  moduleId: "",
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    setSelectedModule: (state, action) => {
      state.moduleTitle = action.payload.moduleTitle;
      state.moduleId = action.payload.moduleId;
    },
  },
});

export const { setSelectedModule } = moduleSlice.actions;
export default moduleSlice.reducer;
