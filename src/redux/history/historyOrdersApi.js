/** @format */

import { getHistoryOrder, getCancel, getComplete, getDelivering } from './historyOrdersSlice';
import { historyService } from '../../services';

export const getHistoryOrders = async (dispatch, phone) => {
  let res = await historyService.getHistoryOrderByPhone(phone);
  dispatch(getHistoryOrder(res));
};

export const getAllCancelBill = async (dispatch, phone) => {
  let res = await historyService.getHistoryCancelOrderByPhone(phone);
  dispatch(getCancel(res));
};

export const getAllCompleteBill = async (dispatch, phone) => {
  let res = await historyService.getHistoryCompleteOrderByPhone(phone);
  dispatch(getComplete(res));
};
export const getAllDeliveringBill = async (dispatch, phone) => {
  let res = await historyService.getHistoryDeliveringByPhone(phone);
  dispatch(getDelivering(res));
};

export const updateHistoryOrders = async (dispatch, data) => {
  let res = await historyService.updateHistoryOrder(data);
  dispatch(getHistoryOrder(res));
};
