/** @format */

import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Grid, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import FormInputText from '../../../../components/FormInputText/FormInputText';
import { loginService } from '../../../../services/login.service';
import { createLocalStorage } from '../../../../utils/createStorage';

export default function FormLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const schema = Yup.object().shape({
    phone: Yup.string()
      .required('Vui lòng nhập số điện thoại')
      .min(10, 'Số điện thoại di động phải có ít nhất 10 số')
      .max(13, 'Số điện thoại di động không được vượt quá 13 số'),
    password: Yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải có ít nhất 6 kí tự'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    loginService
      .postLogin(data)
      .then((res) => {
        if (res.status === 200) {
          const ageToken = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
          const storage = createLocalStorage('loginClient');
          storage.set('user', res.data.user);
          storage.set('accessToken', res.data.accessToken);
          storage.set('refreshToken', res.data.refreshToken);
          storage.set('ageToken', ageToken.getTime());
          toast.success('Đăng nhập thành công !');
          toast.clearWaitingQueue();
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error('Số điện thoại hoặc mật khẩu không đúng');
        toast.clearWaitingQueue();
      });
  };

  return (
    <section className="flex justify-center h-[100vh] items-center">
      <Helmet>
        <title>Laptech.com | Đăng nhập</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <Container maxWidth="lg">
        <Paper style={{ overflow: 'hidden' }}>
          <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={6} style={{ padding: 30 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-center mb-4">ĐĂNG NHẬP</h2>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormInputText
                      name="phone"
                      type="number"
                      label="Số điện thoại"
                      control={control}
                      error={errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormInputText
                      name="password"
                      label="Mật khẩu"
                      type={showPassword ? 'text' : 'password'}
                      textFieldProps={{
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword} edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      control={control}
                      error={errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      style={{ backgroundColor: '#04aa6d', padding: '10px', fontSize: '15px', color: '#FFFFFF' }}
                      fullWidth
                      variant="contained"
                      type="submit"
                    >
                      ĐĂNG NHẬP
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Link to="/forgot-password" className="text-[#1877f2]">
                      Quên mật khẩu ?
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={6} style={{ padding: 0 }}>
              <img width="100%" src="https://cdn.tgdd.vn/Files/2019/06/24/1175235/5_800x450.jpg" alt="" />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </section>
  );
}
