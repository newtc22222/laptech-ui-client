/** @format */

import { axiosClient } from '../api';
export const loginService = {
  postLogin(data) {
    return axiosClient.post('/auth/login', data);
  },

  postRegister(data) {
    return axiosClient.post('/auth/register', data);
  },
};
