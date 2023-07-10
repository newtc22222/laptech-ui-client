/** @format */

import { orderService } from '../../services';
import { postOrder } from './orderSlice';

export const postOrders = async (dispatch, data) => {
  let res = await orderService.postOrder(data);
  dispatch(postOrder(res));
};
