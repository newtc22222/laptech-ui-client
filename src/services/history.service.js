/** @format */

import { axiosClient } from '../api';

export const historyService = {
  updateHistoryOrder(id, data) {
    return axiosClient.put(`/invoices/${id}/status`, data);
  },

  getHistoryOrderByUserId(id) {
    return axiosClient.get(`/users/${id}/invoices`);
  },

  getDetailItem(id) {
    return axiosClient.get(`/invoices/${id}/units?isCard=true`);
  },
};
