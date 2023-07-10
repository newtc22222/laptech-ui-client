/** @format */

import { Typography } from '@material-ui/core';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/Login/loginSlice';
import { clearCart } from '../../redux/shopping-cart/cartItemsSlide';
import SearchProduct from '../Search/Search';
import CartButton from './CartButton';
import './header.module.scss';
import styles from './header.module.scss';

function Header() {
  const dataUser = JSON.parse(localStorage.getItem('loginClient')) || {};
  const { user } = dataUser || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('loginClient');
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

  const handleClick = (event) => {
    navigate('/user/account');
  };

  return (
    <header className={styles.heading + ' pb-3'}>
      <div className={styles.top}>
        <div className={styles.wrap}>
          <Link to="/">
            <div>
              <Typography
                variant="h4"
                style={{
                  fontWeight: 800,
                  fontSize: '3rem',
                  // boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
                }}
              >
                LAP<span style={{ color: '#EAFF6F' }}>TECH</span>
              </Typography>
            </div>
          </Link>
          <SearchProduct />
          {user ? (
            <div>
              <Button onClick={handleClick} style={{ color: '#fff', fontSize: 15, textTransform: 'none' }}>
                {user.name}
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <div className="flex  items-center cursor-pointer">
                <PersonOutlineOutlinedIcon fontSize="large" />
                <span className="mx-2 text-[15px]">Đăng nhập </span>
              </div>
            </Link>
          )}

          {user ? (
            <div className="flex  items-center cursor-pointer" onClick={handleLogOut}>
              <ExitToAppOutlinedIcon fontSize="large" />
              <span className="mx-2 text-[15px] ">Đăng xuất</span>
            </div>
          ) : (
            <Link to="/register">
              <div className="flex  items-center cursor-pointer">
                <PersonAddAlt1OutlinedIcon fontSize="large" />
                <span className="mx-2 text-[15px]">Đăng ký</span>
              </div>
            </Link>
          )}

          <Link to="/cart">
            <CartButton />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
