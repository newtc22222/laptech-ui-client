/** @format */

import React from 'react';
import { useCart } from '../../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'react-bootstrap-icons';
import ProductItem from '../Cart/ProductItem';
import { numberWithCommas } from '../../../utils';

const CartBox = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, totalQuantity } = useCart();

  const handleSubmit = () => {
    navigate('/cart');
  };

  return (
    <div className="w-full m-auto border border-[#04aa6d] py-12 mt-4">
      <div className="flex justify-between py-4 px-4">
        <Link to="/" className="text-blue-500 flex items-center">
          <i>
            <ChevronLeft />
          </i>
          Mua thêm sản phẩm khác
        </Link>
        <p>Giỏ hàng của bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl px-14 py-8 shadow-sm">
        {cartItems.map((product, index) => (
          <ProductItem key={index} {...product} />
        ))}
        <div className="flex justify-between py-4">
          <span>Tạm tính ({totalQuantity} sản phẩm):</span>
          <span> {numberWithCommas(totalPrice)}₫</span>
        </div>

        <div>
          <div className="flex justify-between my-4">
            <strong>Tổng tiền:</strong>
            <strong className="text-red-600">{numberWithCommas(totalPrice)}₫</strong>
          </div>
          <button
            type="submit"
            className="border-none cursor-pointer h-20 my-8 bg-[#04aa6d] rounded-lg w-full text-white font-bold"
          >
            ĐẶT HÀNG
          </button>
        </div>
      </form>
    </div>
  );
};

export default CartBox;
