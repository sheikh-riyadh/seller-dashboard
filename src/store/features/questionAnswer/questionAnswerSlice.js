import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
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

export const { handleIsClicked, handleQuestionNAnswerSize } =
  questionAnswerSlice.actions;

export default questionAnswerSlice.reducer;
