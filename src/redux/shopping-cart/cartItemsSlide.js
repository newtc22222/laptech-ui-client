/** @format */

import { createSlice } from '@reduxjs/toolkit';

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
  value: items,
};

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const duplicate = state.value.filter((e) => e.id === newItem.id);
      if (duplicate.length > 0) {
        state.value = state.value.filter((e) => e.id !== newItem.id);

        state.value = [
          ...state.value,
          {
            id: duplicate[0].id,
            image: newItem.image,
            name: newItem.name,
            discountPrice: newItem.discountPrice,
            price: newItem.price,
            quantity: newItem.quantity + duplicate[0].quantity,
            quantityInStock: newItem.quantityInStock,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...action.payload,
            // id: state.value.length > 0 ? state.value[state.value.length - 1].id + 1 : 1,
            id: action.payload.id,
          },
        ];
      }
      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))),
      );
    },
    updateItem: (state, action) => {
      const newItem = action.payload;
      const item = state.value.filter((e) => e.id === newItem.id);
      if (item.length > 0) {
        state.value = state.value.filter((e) => e.id !== newItem.id);

        state.value = [
          ...state.value,
          {
            id: newItem.id,
            image: newItem.image,
            name: newItem.name,
            price: newItem.price,
            discountPrice: newItem.discountPrice,
            quantity: newItem.quantity,
            quantityInStock: newItem.quantityInStock,
          },
        ];
      }
      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))),
      );
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.value = state.value.filter((e) => e.id !== item.id);

      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))),
      );
    },
    clearCart: (state, action) => {
      state.value = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addItem, removeItem, updateItem, clearCart } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
