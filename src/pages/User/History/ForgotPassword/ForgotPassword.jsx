/** @format */

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Grid, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { userService } from '../../../../services';
import FormForgotPassword from './FormForgotPasword';
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator';

const ForgotPassword = () => {
  const schema = Yup.object().shape({
    email: Yup.string().required('Vui lòng nhập email'),

    phone: Yup.string()
      .required('Vui lòng nhập số điện thoại')
      .min(10, 'Số điện thoại di động phải có ít nhất 10 số')
      .max(13, 'Số điện thoại di động không được vượt quá 13 số'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [requesting, setRequesting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleUpdatePassword = (data) => {
    const dataUpdate = { ...data, userName: '' };
    setRequesting(true);
    userService
      .forgotPassword(dataUpdate)
      .then((res) => {
        if (res.status === 200) {
          toast.success('Mã thông báo đặt lại mật khẩu đã được gửi qua email của bạn !');
          toast.clearWaitingQueue();
          setRequesting(false);
          navigate('/update-password');
        }
      })
      .catch((err) => {
        toast.error('Số điện thoại hoặc email không đúng !');
      });
  };
  return (
    <>
      <LoadingIndicator loading={requesting} />

      <section className="flex justify-center h-[100vh] items-center">
        <Helmet>
          <title>Laptech.com | Quên mật khẩu</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>
        <Container maxWidth="md">
          <Paper style={{ padding: '20px 0' }}>
            <h2 className="text-center font-bold p-4">THAY ĐỔI MẬT KHẨU</h2>
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item xs={10} style={{ padding: '20px 0' }}>
                <FormForgotPassword control={control} errors={errors} />
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
                  onClick={handleSubmit(handleUpdatePassword)}
                >
                  Gửi
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </section>
    </>
  );
};

export default ForgotPassword;
