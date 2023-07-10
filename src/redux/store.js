/** @format */

import { configureStore } from '@reduxjs/toolkit';

import productModalReducer from './product-modal/productModalSlice';

import cartItemsReducer from './shopping-cart/cartItemsSlide';
import comments from './comment/commentsSlice';
import feedbacks from './feedback/feedbacksSlice';
import products from './product/productsSlice';
import historyOrdersSlice from './history/historyOrdersSlice';
import orderSlice from './order/orderSlice';
import loginSlice from './Login/loginSlice';
//khoi tao store
export const store = configureStore({
  reducer: {
    productModal: productModalReducer,
    cartItems: cartItemsReducer,
    comments: comments,
    feedbacks: feedbacks,
    products: products,
    historyOrders: historyOrdersSlice,
    order: orderSlice,
    loginSlice: loginSlice,
  },
});
