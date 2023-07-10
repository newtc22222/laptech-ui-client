/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const products = createSlice({
  name: 'products',
  initialState: {
    allProducts: {
      data: [],
    },

    productDetail: {
      data: {},
    },

    productImage: {
      data: [],
    },
    productSearch: {
      data: [],
    },
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.allProducts.data = action.payload.data;
    },
    updateAllProduct: (state, action) => {
      state.allProducts.data = action.payload;
    },

    getProductDetail: (state, action) => {
      state.productDetail.data = action.payload;
    },

    getProductImage: (state, action) => {
      state.productImage.data = action.payload;
    },
    getProductByName: (state, action) => {
      state.productSearch.data = action.payload.data;
    },
  },
});
export const { getAllProducts, getProductDetail, updateAllProduct, getProductImage, getProductByName } =
  products.actions;

export default products.reducer;
