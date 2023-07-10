/** @format */

import { axiosClient } from '../api';

export const bannerService = {
  getAllBanner() {
    return axiosClient.get(`/banners`);
  },
};
