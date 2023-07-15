/** @format */

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Header } from '../components';
import { Cart, Home, NotFound, Order, ProductDetail } from '../pages/User';
import ResultCheckout from '../pages/User/Cart/ResultCheckout';
import ChangePassword from '../pages/User/History/ChangePassword/ChangePassword';
import ForgotPassword from '../pages/User/History/ForgotPassword/ForgotPassword';
import UpdatePassword from '../pages/User/History/ForgotPassword/UpdatePassword';
import OrderTable from '../pages/User/History/HistoryOrder/OrderTable';
import FormLogin from '../pages/User/History/Login/FormLogin';
import Profile from '../pages/User/History/Profile/Profile';
import FormRegister from '../pages/User/History/Register/FormRegister';
import Sidebar from '../pages/User/History/User/Sidebar';
import LaptopBrand from '../pages/User/LaptopBrand/LaptopBrand';
import RatingPage from '../pages/User/Rating/RatingPage';
import SearchPage from '../pages/User/SearchPage/SearchPage';
import AllProduct from '../pages/User/AllProduct/AllProduct';
const AllRoute = () => {
  const dataUser = JSON.parse(localStorage.getItem('loginClient')) || {};
  const isLoggedIn = Object.keys(dataUser).length > 0;
  const location = useLocation();
  const pathName = location.pathname;
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword');

  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        {pathName.match('user') && (
          <div style={{ width: '20%', backgroundColor: '#fff' }}>
            <Sidebar />
          </div>
        )}

        <div style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<ProductDetail />} />
            <Route path="/detail/:id/rating" element={<RatingPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={isLoggedIn ? <Order /> : <Navigate to="/login" />} />
            <Route path="/login" element={<FormLogin />} />
            <Route path="/register" element={<FormRegister />} />
            <Route path="/brand/:id" element={<LaptopBrand />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/user/purchase" element={isLoggedIn ? <OrderTable /> : <Navigate to="/login" />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/user/change-password" element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />} />
            <Route path="/user/account" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/search" element={<SearchPage keyword={keyword} />} />
            <Route path="/result_checkout" element={<ResultCheckout />} />
            <Route path="/products" element={<AllProduct />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllRoute;
