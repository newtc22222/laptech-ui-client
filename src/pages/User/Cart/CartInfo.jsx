/** @format */

import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Paper, Radio, RadioGroup } from '@material-ui/core';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from 'react';
import { ChevronLeft } from 'react-bootstrap-icons';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { LocationForm } from '../../../components';
import LoadingIndicator from '../../../components/LoadingIndicator/LoadingIndicator';
import { useCart } from '../../../hooks';
import { clearCart } from '../../../redux/shopping-cart/cartItemsSlide';
import { userService } from '../../../services';
import { orderService } from '../../../services/order.service';
import { numberWithCommas } from '../../../utils';
import './Cart.scss';
import FormDataCart from './FormDataCart';
import ProductItem from './ProductItem';

function CartInfo() {
  const cartData = useCart();
  const [requesting, setRequesting] = useState(false);
  const { cartItems, totalPrice, totalQuantity } = cartData;
  const [address, setAddress] = useState();
  const defaultAdress = `${address?.street}, ${address?.line3}, ${address?.line2}`;

  const [addressOption, setAddresOption] = useState();
  const [checked, setChecked] = useState(false);

  const [selectedValue, setSelectedValue] = useState('cash');

  const handleChangePayment = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const dataUser = JSON.parse(localStorage.getItem('loginClient')) || {};
  const { user } = dataUser || {};

  useEffect(() => {
    userService
      .getAddress(user?.id)
      .then((res) => {
        setAddress(res.data);
      })
      .catch((err) => {
        console.log('error');
      });
  }, [user?.id]);

  const schema = Yup.object().shape({
    phone: Yup.string()
      .required('Vui lòng nhập số điện thoại')
      .min(10, 'Số điện thoại di động phải có ít nhất 10 số')
      .max(13, 'Số điện thoại di động không được vượt quá 13 số'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = methods;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const invoiceId = Math.floor(Math.random() * 100000000).toString(4);

    cartItems?.forEach((item) => {
      const dataProduct = {
        id: crypto.randomUUID().slice(0, 6),
        invoiceId: invoiceId,
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        discountPrice: item.discountPrice,
        updateBy: 'system',
      };
      orderService.postItem(dataProduct);
    });
    const dataAddress = checked
      ? defaultAdress
      : data.homeaddress + ',' + addressOption.ward + ',' + addressOption.district + ',' + addressOption.city;
    const userId = user?.id;
    const dataInvoice = {
      address: dataAddress,
      userId: userId,
      paymentTotal: totalPrice,
      paymentAmount: totalQuantity,
      paymentType: selectedValue,
      orderStatus: 'PENDING',
      phone: data.phone,
      shipCost: 0,
      tax: 0,
      updateBy: 'system',
      id: invoiceId,
      note: data.note,
      discountAmount: 0,
      isPaid: false,
    };

    orderService.postOrder(dataInvoice).then((res) => {
      setRequesting(true);

      if (res.status === 201) {
        setRequesting(false);
        dispatch(clearCart());
        navigate('/order?invoiceData=' + encodeURIComponent(invoiceId));
      }
    });
  };

  return (
    <div className="w-2/4 m-auto border border-[#04aa6d] pt-[100px]">
      <LoadingIndicator loading={requesting} />
      <div className="flex justify-between py-4 px-4">
        <Link to="/" className="text-blue-500 flex items-center font-bold">
          <i>
            <ChevronLeft />
          </i>
          Mua thêm sản phẩm khác
        </Link>
        <p className="font-bold">Giỏ hàng của bạn</p>
      </div>

      <Paper>
        <form className="rounded-xl px-14 py-8" onSubmit={handleSubmit(onSubmit)}>
          {cartItems.map((product, index) => (
            <ProductItem key={index} {...product} />
          ))}

          <div className="flex justify-between py-4">
            <span>Tạm tính ({totalQuantity} sản phẩm):</span>
            <span className="text-red-500 font-bold"> {numberWithCommas(totalPrice)}₫</span>
          </div>

          <div className="my-8 border-t py-4">
            <h4 className="flex justify-center font-bold">THÔNG TIN KHÁCH HÀNG</h4>
          </div>

          <FormDataCart control={control} errors={errors} disabled={checked ? true : false} />

          <div className="my-8">
            <p style={{ padding: '10px' }}>Chọn địa chỉ nhận hàng </p>
            <div>
              {address !== undefined && (
                <div>
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      checked={checked}
                      size="large"
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <span>Chọn địa chỉ mặc định</span>
                  </div>
                  <div className="flex items-center pl-4">
                    <HomeIcon />
                    <p className="font-bold text-[18px] p-4">{defaultAdress}</p>
                  </div>
                </div>
              )}
              <div className="border border-blue-400 ">
                <LocationForm
                  onChange={(e) => {
                    setAddresOption(e);
                  }}
                  disabled={checked ? true : false}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <span style={{ padding: '10px' }}>Chọn phương thức thanh toán</span>
            <RadioGroup
              aria-label="selection"
              className="my-4"
              name="selection"
              value={selectedValue}
              onChange={handleChangePayment}
            >
              <div className="flex gap-4 items-center">
                <Radio value="cash" control={<Radio />} />
                <span>Thanh toán khi nhận hàng</span>
              </div>
              <div className="flex gap-4 items-center">
                <Radio value="momo" control={<Radio />} />
                <span>Thanh toán bằng ví Momo</span>
              </div>
            </RadioGroup>
          </div>

          <div>
            <div className="flex justify-between my-4">
              <strong>Tổng tiền:</strong>
              <strong className="text-red-600">{numberWithCommas(totalPrice)}₫</strong>
            </div>
            <button
              disabled={user ? false : true}
              type="submit"
              className="border-none h-20 my-8  rounded-lg w-full text-white font-bold cursor-pointer "
              style={user ? { backgroundColor: '#04aa6d' } : { backgroundColor: 'gray' }}
            >
              {user ? 'ĐẶT HÀNG' : 'Đăng nhập vào hệ thống để đặt hàng'}
            </button>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default CartInfo;
