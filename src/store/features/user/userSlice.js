import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    seller: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.seller = action.payload;
    },
    removeUser: (state) => {
      state.value.seller = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser,removeUser } = userSlice.actions;

export default userSlice.reducer;
