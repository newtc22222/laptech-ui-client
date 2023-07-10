/** @format */

import { axiosClient } from '../api';

export const orderService = {
  postOrder(data) {
    return axiosClient.post('/invoices', data);
  },
  postItem(data) {
    return axiosClient.post('/units', data);
  },

  updateOrder(id, data) {
    return axiosClient.patch(`/invoices/${id}`, data);
  },
};
