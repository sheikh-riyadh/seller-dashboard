import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    questionIndex: 0,
  },
};

const questionAnswerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    handleQuestionIndex: (state, { payload }) => {
      state.value.questionIndex = payload;
    },
  },
});

export const { handleQuestionIndex } = questionAnswerSlice.actions;

export default questionAnswerSlice.reducer;
