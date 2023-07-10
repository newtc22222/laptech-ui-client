/** @format */

import { axiosClient } from '../api';

export const commentService = {
  getCommentByProductId(id) {
    return axiosClient.get(`/products/${id}/comments`);
  },

  postComment(data) {
    return axiosClient.post(`/comments`, data);
  },
};
