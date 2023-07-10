/** @format */

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CounterQuantity } from '../../../components';
import { removeItem, updateItem } from '../../../redux/shopping-cart/cartItemsSlide';
import { numberWithCommas } from '../../../utils';
function ProductItem(props) {
  const cartItems = useSelector((state) => state.cartItems.value);
  const dispatch = useDispatch();
  const removeCartItem = () => {
    cartItems.forEach((item) => {
      if (item.id === props.id) {
        dispatch(removeItem(item));
      }
    });
  };
  const updateCartItem = (value) => {
    cartItems.forEach((item) => {
      if (item.id === props.id) {
        dispatch(updateItem({ ...item, quantity: value }));
      }
    });
  };
  return (
    <div className="flex justify-between my-8 border-b pb-4">
      <div className="flex flex-col items-center justify-center w-28 gap-4">
        <img width="80px" src={props.image} alt="img-cart-product" />
        <div className="text-lg text-gray-600">
          <div onClick={() => removeCartItem()} className=" flex items-center cursor-pointer">
            <HighlightOffIcon fontSize="large" /> Xóa
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex gap-2 ml-4 ">
          <Link to={`/detail/${props.id}`} className="font-semibold">
            {props.name}
          </Link>
          <div>
            <p className="text-red-500 font-bold">{numberWithCommas(props.discountPrice)}₫</p>
            {/* <p className="line-through">{numberWithCommas(props.price)}₫</p> */}
          </div>
        </div>
        <div className="flex justify-between">
          <CounterQuantity
            onChange={(value) => updateCartItem(value)}
            value={props.quantity}
            quantityInStock={props.quantityInStock}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
