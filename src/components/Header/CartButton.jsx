/** @format */

import Cart from '../Icons/Cart';
import { useCart } from '../../hooks';

function CartButton({ ...props }) {
  const { totalQuantity } = useCart();
  return (
    <div className="relative">
      <div className="absolute  top-3 left-3 translate-x-4 -translate-y-1/2 bg-red-600 w-6 h-6 rounded-full flex items-center justify-center">
        <span className="text-white text-xl">{totalQuantity}</span>
      </div>
      <div className="flex items-center">
        <i className="text-[30px]">
          <Cart />
        </i>
        <span className="ml-2 text-[15px]">Giỏ hàng</span>
      </div>
    </div>
  );
}

export default CartButton;
