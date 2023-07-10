/** @format */

import moment from 'moment';

export const convertUTCDate = (inputDateTime) => {
  const date = new Date(inputDateTime);

  const outputDateTime = date.setHours(date.getHours() + 7);
  const formatDate = moment(outputDateTime).format('DD/MM/YYYY HH:mm');
  return formatDate;
};
