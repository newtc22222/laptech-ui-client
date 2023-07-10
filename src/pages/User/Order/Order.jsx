/** @format */

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, Container, Grid, Paper } from '@mui/material';
import { Typography } from 'antd';
import React from 'react';
import Confetti from 'react-confetti';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../../../utils';
import { Button } from '@material-ui/core';

const Order = () => {
  const order = useSelector((state) => state.order?.order?.data);
  const dataOrder = order?.data;
  const dataUser = JSON.parse(localStorage.getItem('loginClient')) || {};
  const { user } = dataUser || {};
  const navigate = useNavigate();

  return (
    <Container style={{ paddingTop: '80px', maxWidth: '700px', minHeight: '800px', position: 'relative' }}>
      <Helmet>
        <title>Laptech.com | Đơn hàng</title>
        <meta name="description" content="Description of order" />
      </Helmet>
      <Paper style={{ padding: 20, marginBottom: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography style={{ fontSize: '2.2rem', lineHeight: '1.5', fontWeight: 'bold', color: '#04aa6d' }}>
                Đặt hàng thành công
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ padding: 20, height: '550px' }}>
        <Grid container rowSpacing={2} style={{ padding: '60px 0' }}>
          <Grid item xs={6}>
            <Typography style={{ fontSize: '1.6rem', lineHeight: '1.5', fontWeight: 'bold' }}>
              <Box style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AccountCircleOutlinedIcon style={{ fontSize: '25px' }} />
                Khách hàng
              </Box>
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography style={{ fontSize: '1.5rem' }}>{user?.name}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography style={{ fontSize: '1.6rem', lineHeight: '1.5', fontWeight: 'bold' }}>
              <Box style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <LocalPhoneOutlinedIcon style={{ fontSize: '25px' }} />
                Số điện thoại
              </Box>
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography style={{ fontSize: '1.5rem' }}>{user?.phone}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography style={{ fontSize: '1.6rem', lineHeight: '1.5', fontWeight: 'bold' }}>
              <Box style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <LocationOnOutlinedIcon style={{ fontSize: '25px' }} />
                Địa chỉ
              </Box>
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography style={{ fontSize: '1.5rem' }}>{dataOrder?.address}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography style={{ fontSize: '1.6rem', lineHeight: '1.5', fontWeight: 'bold' }}>
              <Box style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AttachMoneyOutlinedIcon style={{ fontSize: '25px' }} />
                Tổng tiền
              </Box>
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography style={{ fontSize: '1.5rem', color: 'red' }}>
              {numberWithCommas(dataOrder?.paymentTotal)} đ
            </Typography>
          </Grid>
        </Grid>

        <div
          style={{
            maxWidth: '700px',
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bottom: '-10%',
          }}
        >
          <img src="https://media.tenor.com/h7f8fT6rAMoAAAAC/pio-chick.gif" alt="..." />
        </div>
        <div
          style={{
            maxWidth: '700px',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Confetti gravity={0.05} width={600} height={200} />
        </div>
      </Paper>
      <Button
        fullWidth
        style={{ backgroundColor: '#1d4ed8', color: '#fff', fontSize: '16px' }}
        onClick={() => navigate('/')}
      >
        Quay về trang chủ
      </Button>
    </Container>
  );
};

export default Order;
