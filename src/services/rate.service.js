import { axiosClient } from '../api';

export const ratingService = {
  getRating(id) {
    return axiosClient.get(`/rating/product/${id}`);
  },
  postRating(data) {
    return axiosClient.post(`/rating`, data);
  },
  patchRating(id, data) {
    return axiosClient.patch(`/rating/${id}`, data);
  },
};
