import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    bannerImages: [...Array(4).fill(null)],
  },
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    handleBannerImages: (state, { payload }) => {
      state.value.bannerImages[payload.index] = payload.data;
    },
    handleDeleteBannerImage: (state, { payload }) => {
      state.value.bannerImages[payload] = null;
    },
    handleSetBannerImage: (state, { payload }) => {
      state.value.bannerImages = payload;
    },

    handleBannerClear: (state) => {
      (state.value.keyFeatures = []),
        (state.value.description = ""),
        (state.value.additionalInfo = ""),
        (state.value.images = [...Array(4).fill(null)]);
    },
  },
});

export const {
  handleBannerImages,
  handleClear,
  handleDeleteBannerImage,
  handleSetBannerImage,
} = bannerSlice.actions;

export default bannerSlice.reducer;
