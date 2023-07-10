/** @format */

import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Grid } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import FormInputDate from '../../../../components/DatePicker/FormInputDate';
import FormInputText from '../../../../components/FormInputText/FormInputText';
import RadioButtonGroup from '../../../../components/RadioButtonGroup/RadioButtonGroup';
import { loginService } from '../../../../services/login.service';

export default function FormRegister() {
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    phone: Yup.string()
      .required('Vui lòng nhập số điện thoại')
      .min(10, 'Số điện thoại di động phải có ít nhất 10 số')
      .max(13, 'Số điện thoại di động không được vượt quá 13 số'),
    password: Yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có ít nhất 8 kí tự'),
    name: Yup.string().required('Vui lòng nhập tên'),
    email: Yup.string().required('Vui lòng nhập email'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: 'FEMALE',
      dateOfBirth: '01/01/2023',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    const dataUser = {
      ...data,
      dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD'),
      id: parseInt(data.phone),
    };

    loginService.postRegister(dataUser).then((res) => {
      if (res.status === 201) {
        toast.success('Đăng ký thành công !');
        toast.clearWaitingQueue();
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <section className="flex justify-center  items-center">
      <Helmet>
        <title>Laptech.com | Đăng ký</title>
        <meta name="description" content="Description of RegisterPage" />
      </Helmet>
      <div className="register" style={{ padding: 110 }}>
        <Container maxWidth="lg">
          <Paper style={{ padding: 30 }}>
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item xs={6}>
                <h2 className="text-center mb-8">ĐĂNG KÝ</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormInputText
                        name="phone"
                        label="Số điện thoại"
                        type="number"
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
                      <FormInputText name="name" label="Tên" type="text" control={control} error={errors.name} />
                    </Grid>

                    <Grid item xs={12}>
                      <FormInputText name="email" label="Email" type="text" control={control} error={errors.email} />
                    </Grid>
                    <Grid item xs={12}>
                      <FormInputDate
                        name="dateOfBirth"
                        label="Ngày sinh"
                        control={control}
                        error={errors.dateOfBirth}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RadioButtonGroup name="gender" control={control} error={errors.gender} label="Giới tính" />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        style={{ backgroundColor: '#04aa6d', padding: '10px', fontSize: '15px', color: '#FFFFFF' }}
                        fullWidth
                        variant="contained"
                        type="submit"
                      >
                        ĐĂNG KÝ
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>

              <Grid item xs={6}>
                <img
                  width="100%"
                  height="500px"
                  src="https://png.pngtree.com/background/20220723/original/pngtree-laptop-on-the-desk-picture-image_1719660.jpg"
                  alt="img-register"
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </section>
  );
}
