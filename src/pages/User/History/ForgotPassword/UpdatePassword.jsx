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
import FormUpdatePassword from './FormUpdatePassword';

const UpdatePassword = () => {
  const schema = Yup.object().shape({
    newPassword: Yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có ít nhất 8 kí tự'),
    token: Yup.string().required('Vui lòng nhập reset token'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleSetNewPassword = (data) => {
    userService
      .updatePassword(data.token, { newPassword: data.newPassword })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Tạo mật khẩu mới thành công !');
          toast.clearWaitingQueue();
          navigate('/login');
        } else {
          toast.error('Reset password token không đúng !');
        }
      })
      .catch((error) => {
        toast.error('Reset password token không đúng !');
      });
  };
  return (
    <section className="flex justify-center h-[100vh] items-center">
      <Helmet>
        <title>Laptech.com | Quên mật khẩu</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <Container maxWidth="md">
        <Paper style={{ padding: '20px 0' }}>
          <h2 className="text-center font-bold p-4">QUÊN MẬT KHẨU</h2>
          <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={10} style={{ padding: '20px 0' }}>
              <FormUpdatePassword
                control={control}
                errors={errors}
                showNewPassword={showNewPassword}
                handleClickShowNewPassword={handleClickShowNewPassword}
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
                onClick={handleSubmit(handleSetNewPassword)}
              >
                Gửi
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </section>
  );
};

export default UpdatePassword;
