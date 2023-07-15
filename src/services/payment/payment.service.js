/** @format */

import { axiosClient } from '../../api';

const createPaymentLink = (payload) => {
  return axiosClient.post('/checkout/momo', payload);
};

export const PaymentService = {
  createPaymentLink,
};
