/** @format */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../../redux/shopping-cart/cartItemsSlide';
import { numberWithCommas } from '../../../../utils';
import CartOffcanvas from '../CartOffCanvas';

function PayInfo() {
  const initProductDetail = useSelector((state) => state.products.productDetail.data);
  const dataProduct = initProductDetail?.data?.product;
  const id = dataProduct?.id;
  const name = dataProduct?.name;
  const discountPrice = initProductDetail?.data?.discountPrice;
  const image = initProductDetail?.data?.imageList[0]?.url;
  const price = dataProduct?.listedPrice;
  const quantityInStock = dataProduct?.quantityInStock;
  const [show, setShow] = useState(false);

  const hanldeClose = () => {
    setShow(false);
  };

  let productForCart = { id, name, image, quantity: 1, discountPrice, price, quantityInStock };

  const dispatch = useDispatch();

  const addToCart = (data) => {
    dispatch(addItem(data));
  };

  const handleClickPay = () => {
    addToCart(productForCart);
    setShow(true);
  };

  return (
    <div className="mt-[40px]">
      <div className="border border-gray-200 text-2xl min-h-[300px] flex flex-col items-center justify-center">
        <ul className="p-4">
          <div className="space-y-6">
            <h1 className="text-3xl text-[#212529] font-medium my-12">{name}</h1>
            <span className="font-bold text-4xl text-[#04aa6d] my-12">
              {numberWithCommas(initProductDetail?.data?.discountPrice)}₫
            </span>
          </div>
        </ul>
      </div>
      <div>
        <div className="w-full mt-12">
          <button
            className={
              'border-none bg-[#04aa6d] w-full mb-4 block p-4 rounded-lg text-white font-bold cursor-pointer' +
              (quantityInStock === 0 && ' bg-[#333] opacity-50')
            }
            onClick={handleClickPay}
            disabled={quantityInStock > 0 ? false : true}
          >
            {quantityInStock > 0 ? 'THÊM VÀO GIỎ HÀNG' : 'SẢN PHẨM ĐANG HẾT HÀNG'}
          </button>
        </div>
      </div>

      <CartOffcanvas show={show} handleClose={hanldeClose} />
    </div>
  );
}

export default PayInfo;
