/** @format */

import { useState } from 'react';
import { DashLg, PlusLg } from 'react-bootstrap-icons';

function CounterQuantity({ onChange, value, quantityInStock }) {
  // const initProductDetail = useSelector((state) => state.products.productDetail.data);

  // const quantityInStock = initProductDetail?.data?.product?.quantityInStock;

  const [quantity, setQuantity] = useState(value);

  const handleChange = (e) => {
    let number = parseInt(e.target.value);
    if (Number.isInteger(number) && number > 0 && number <= quantityInStock) {
      setQuantity(number);
      onChange(number);
    }
  };
  return (
    <div className="flex flex-row gap-2 items-center pl-40">
      <span
        className="select-none cursor-pointer p-6 text-blue-400 h-10 flex items-center"
        style={quantity === 1 ? { color: '#ccc' } : {}}
        onClick={() => {
          if (quantity === 1) return;
          setQuantity((old) => old - 1);
          onChange(quantity - 1);
        }}
        aria-disabled={quantity === 1}
      >
        <i>
          <DashLg />
        </i>
      </span>
      <input
        type="number"
        onChange={handleChange}
        value={quantity}
        name="form-0-quantity"
        className="h-16 w-16 outline-none text-center text-xl border-inset"
      />
      <span
        className="select-none cursor-pointer p-6 text-blue-400 h-16 flex items-center"
        style={quantity === quantityInStock ? { color: '#ccc' } : {}}
        onClick={() => {
          if (quantity < quantityInStock) {
            setQuantity((old) => old + 1);
            onChange(quantity + 1);
          }
        }}
        aria-disabled={quantity === quantityInStock}
      >
        <i>
          <PlusLg />
        </i>
      </span>
      <div className="w-[150px]">{quantityInStock} sản phẩm có sẵn</div>
    </div>
  );
}

export default CounterQuantity;
