/** @format */

import React from 'react';
import emptyOrderImage from '../../../../assets/emptyOrder.png';

const EmptyOrder = () => {
  return (
    <div className="flex flex-col h-[100%] w-[100%] items-center py-[100px] ">
      <img width="150px" src={emptyOrderImage} alt="..." />
      <span>Chưa có đơn hàng</span>
    </div>
  );
};

export default EmptyOrder;
