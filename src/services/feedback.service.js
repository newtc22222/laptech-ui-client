/** @format */

import { axiosClient } from '../api';

export const feedbackService = {
  getFeedbackByProductId(id) {
    return axiosClient.get(`/products/${id}/feedbacks`);
  },

  postFeedback(data) {
    return axiosClient.post(`/feedbacks`, data);
  },
};
