/** @format */

import React from 'react';
import FormDataPassword from './FormDataPassword';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Button, Container, Grid, Paper } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { userService } from '../../../../services';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../redux/Login/loginSlice';
import { clearCart } from '../../../../redux/shopping-cart/cartItemsSlide';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const schema = Yup.object().shape({
    currentPassword: Yup.string()
      .required('Vui lòng nhập mật khẩu hiện tại')
      .min(8, 'Mật khẩu phải có ít nhất 8 kí tự')
      .max(20, 'Mật khẩu không được vượt quá 20 kí tự'),
    newPassword: Yup.string()
      .required('Vui lòng nhập mật khẩu mới')
      .min(8, 'Mật khẩu phải có ít nhất 8 kí tự')
      .max(20, 'Mật khẩu không được vượt quá 20 kí tự'),
    authPassword: Yup.string()
      .required('Vui lòng xác nhận mật khẩu')
      .min(8, 'Mật khẩu phải có ít nhất 8 kí tự')
      .max(20, 'Mật khẩu không được vượt quá 20 kí tự'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [authPassword, setAuthPassword] = useState(false);

  const handleClickShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowAuthPassword = () => setAuthPassword(!authPassword);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleChangePassword = (data) => {
    if (data.newPassword !== data.authPassword) {
      toast.error('Mật khẩu bạn nhập không khớp, Vui lòng thử lại!');
      toast.clearWaitingQueue();
    } else {
      const dataToSend = {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      userService
        .changePassword(dataToSend)
        .then((res) => {
          if (res.status === 200) {
            toast.success('Thay đổi mật khẩu thành công!');
            toast.clearWaitingQueue();
            localStorage.removeItem('loginClient');
            dispatch(logout());
            dispatch(clearCart());
            navigate('/');
          }
        })
        .catch((err) => {
          toast.error('Mật khẩu hiện tại không đúng, vui lòng nhập lại!');
        });
    }
  };
  return (
    <section className="flex justify-center h-[100vh] items-center">
      <Helmet>
        <title>Laptech.com | Đổi mật khẩu</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <Container maxWidth="md">
        <Paper>
          <h2 className="text-center font-bold p-4">THAY ĐỔI MẬT KHẨU</h2>
          <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={10} style={{ padding: '20px 0' }}>
              <FormDataPassword
                control={control}
                errors={errors}
                showCurrentPassword={showCurrentPassword}
                showNewPassword={showNewPassword}
                authPassword={authPassword}
                handleClickShowCurrentPassword={handleClickShowCurrentPassword}
                handleClickShowNewPassword={handleClickShowNewPassword}
                handleClickShowAuthPassword={handleClickShowAuthPassword}
              />
            </Grid>
            <Grid item xs={10} style={{ padding: '20px 0' }}>
              <Button
                style={{
                  background: '#04aa6d',
                  padding: 10,
                  width: '100%',
                  color: '#FFFFFF',
                  height: 40,
                  fontSize: 16,
                }}
                onClick={handleSubmit(handleChangePassword)}
              >
                Cập nhật
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </section>
  );
};

export default ChangePassword;
