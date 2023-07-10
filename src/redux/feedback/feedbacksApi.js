/** @format */

import { feedbackService } from '../../services';
import { getFeedback, postFeedback } from './feedbacksSlice';

export const getFeedbacks = async (dispatch, id) => {
  let res = await feedbackService.getFeedbackByProductId(id);
  dispatch(getFeedback(res));
};

export const postFeedbacks = async (dispatch, data) => {
  let res = await feedbackService.postFeedback(data);

  dispatch(postFeedback(res));
};
