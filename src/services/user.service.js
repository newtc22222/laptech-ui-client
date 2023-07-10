/** @format */

import { axiosClient } from '../api';

export const userService = {
  getUserById(id) {
    return axiosClient.get(`/users/${id}`);
  },
  getCurrentUser() {
    return axiosClient.get('/getCurrentUser');
  },

  editUser(data) {
    return axiosClient.patch('/changeMyInformation', data);
  },

  postUser(data) {
    return axiosClient.post(`/users/`, data);
  },
  changePassword(data) {
    return axiosClient.post('/auth/changePassword', data);
  },
  getAddress(id) {
    return axiosClient.get(`/address/${id}`);
  },
  forgotPassword(data) {
    return axiosClient.post('/auth/forgotPassword', data);
  },
  updatePassword(token, data) {
    return axiosClient.post(`/auth/updatePassword?token=${token}`, data);
  },
  getAllOrders() {
    return axiosClient.get(`/myInvoices`);
  },
};
