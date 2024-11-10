import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    keyFeatures: [],
    description: "",
    additionalInfo: "",
    productImages: [...Array(4).fill(null)],
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
    handleProductImages: (state, { payload }) => {
      state.value.productImages[payload.index] = payload.data;
    },
    handleDeleteProductImage: (state, { payload }) => {
      state.value.productImages[payload] = null;
    },
    handleSetProductImages: (state, { payload }) => {
      state.value.productImages = payload;
    },
    handleSetUpdatedProduct: (
      state,
      { payload: { keyFeatures, description, additionalInfo, productImages } }
    ) => {
      (state.value.additionalInfo = additionalInfo),
        (state.value.description = description),
        (state.value.keyFeatures = keyFeatures),
        (state.value.productImages = productImages);
    },
    handleClearProduct: (state) => {
      (state.value.keyFeatures = []),
        (state.value.description = ""),
        (state.value.additionalInfo = ""),
        (state.value.productImages = [...Array(4).fill(null)]);
    },
  },
});

export const {
  handleAddKeyFeatures,
  handleRemoveKeyFeatures,
  handleDes,
  handleAdditionalInfo,
  handleProductImages,
  handleDeleteProductImage,
  handleSetProductImages,
  handleClearProduct,
  handleSetUpdatedProduct
} = productSlice.actions;

export default productSlice.reducer;
