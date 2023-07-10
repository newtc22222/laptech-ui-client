/** @format */

import { createSlice } from '@reduxjs/toolkit';

const order = JSON.parse(localStorage.getItem('order')) || {};
export const orders = createSlice({
  name: 'orders',
  initialState: {
    order: {
      data: order,
    },
  },
  reducers: {
    postOrder: (state, action) => {
      state.order.data = action.payload;
      const orderData = JSON.stringify(action.payload);

      localStorage.setItem('order', orderData);
    },
  },
});
export const { postOrder } = orders.actions;
export default orders.reducer;
