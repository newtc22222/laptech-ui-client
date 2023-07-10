/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const feedbacks = createSlice({
  name: 'feedbacks',
  initialState: {
    feedback: {
      data: [],
    },
  },
  reducers: {
    getFeedback: (state, action) => {
      state.feedback.data = action.payload;
    },
    postFeedback: (state, action) => {
      state.feedback.data = action.payload;
    },
  },
});
export const { getFeedback, postFeedback } = feedbacks.actions;
export default feedbacks.reducer;
