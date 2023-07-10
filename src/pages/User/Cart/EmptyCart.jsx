/** @format */

import { CartXFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col h-[100vh] gap-4 bg-white">
      <i>
        <CartXFill className="text-[#04aa6d] text-[100px]" />
      </i>
      <p>Không có sản phẩm nào trong giỏ hàng</p>

      <button
        onClick={() => navigate('/')}
        className="bg-[#04aa6d] border-[0] text-[#fff] font-semibold px-5 rounded-lg uppercase h-[40px] cursor-pointer"
      >
        Về trang chủ
      </button>
    </div>
  );
}

export default EmptyCart;
