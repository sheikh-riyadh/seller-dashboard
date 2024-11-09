import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    addBrand: (state, { payload }) => {
      state.brands = [...state.brands, payload];
    },
    removeBrand: (state, { payload }) => {
      const filterBrand = state.brands.filter(
        (brand, index) => index !== payload
      );

      state.brands = filterBrand;
    },
    setBrands: (state, { payload }) => {
      state.brands = payload;
    },
  },
});

export const { addBrand, removeBrand, setBrands } = brandsSlice.actions;
export default brandsSlice.reducer;
