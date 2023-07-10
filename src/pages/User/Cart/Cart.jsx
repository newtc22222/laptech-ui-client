/** @format */

import { useSelector } from 'react-redux';
import CartInfo from './CartInfo';
import EmptyCart from './EmptyCart';
import { Helmet } from 'react-helmet';

function Cart() {
  const cartItems = useSelector((state) => state.cartItems.value);

  return cartItems.length ? (
    <div className="bg-gray-50">
      <Helmet>
        <title>Laptech.com | Giỏ hàng</title>
        <meta name="description" content="Description of cart" />
      </Helmet>
      <CartInfo />
    </div>
  ) : (
    <div>
      <Helmet>
        <title>Laptech.com | Giỏ hàng</title>
        <meta name="description" content="Description of cart" />
      </Helmet>
      <EmptyCart />
    </div>
  );
}

export default Cart;
