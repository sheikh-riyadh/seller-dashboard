import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    keyFeatures: [],
    description: "",
    additionalInfo: "",
    images: [...Array(4).fill(null)],
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    handleAddKeyFeatures: (state, action) => {
      if (!state.value.keyFeatures.includes(action.payload)) {
        state.value.keyFeatures.push(action.payload);
      }
    },
    handleRemoveKeyFeatures: (state, { payload }) => {
      const restKeyFeatures = state.value.keyFeatures.filter(
        (feature) => feature != payload
      );
      state.value.keyFeatures = [...restKeyFeatures];
    },
    handleDes: (state, { payload }) => {
      state.value.description = payload;
    },
    handleAdditionalInfo: (state, { payload }) => {
      state.value.additionalInfo = payload;
    },
    handleImages: (state, { payload }) => {
      state.value.images[payload.index] = payload.data;
    },
    handleClear:(state)=>{
      state.value.keyFeatures=[],
      state.value.description="",
      state.value.additionalInfo="",
      state.value.images=[...Array(4).fill(null)]
    }
  },
});

export const {
  handleAddKeyFeatures,
  handleRemoveKeyFeatures,
  handleDes,
  handleAdditionalInfo,
  handleImages,
  handleClear
} = productSlice.actions;

export default productSlice.reducer;
