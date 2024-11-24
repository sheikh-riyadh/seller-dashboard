import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    questionIndex: 0,
    currentSize: 0,
    previousSize: 0,
    showSize: 0,
    isClicked: false,
  },
};

const questionAnswerSlice = createSlice({
  name: "qna",
  initialState,
  reducers: {
    handleQuestionIndex: (state, { payload }) => {
      state.value.questionIndex = payload;
    },
    handleQuestionNAnswerSize: (state, { payload }) => {
      state.value.currentSize = payload;
      if (state.value.currentSize > state.value.previousSize) {
        state.value.showSize = Math.abs(state.value.previousSize - payload);
        state.value.previousSize = payload;
        state.value.isClicked = false;
      }
    },
    handleIsClicked: (state) => {
      state.value.isClicked = true;
      state.value.showSize = 0;
    },
  },
});

export const {
  handleQuestionIndex,
  handleIsClicked,
  handleQuestionNAnswerSize,
} = questionAnswerSlice.actions;

export default questionAnswerSlice.reducer;
