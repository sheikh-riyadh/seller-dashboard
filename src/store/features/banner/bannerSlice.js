import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    images: [...Array(4).fill(null)],
  },
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    handleImages: (state, { payload }) => {
      state.value.images[payload.index] = payload.data;
    },
    handleDeleteBanner: (state, { payload }) => {
      state.value.images[payload] = null;
    },
    handleSetImage: (state, { payload }) => {
      state.value.images = payload;
    },

    handleClear: (state) => {
      (state.value.keyFeatures = []),
        (state.value.description = ""),
        (state.value.additionalInfo = ""),
        (state.value.images = [...Array(4).fill(null)]);
    },
  },
});

export const { handleImages, handleClear, handleDeleteBanner, handleSetImage } =
  bannerSlice.actions;

export default bannerSlice.reducer;
