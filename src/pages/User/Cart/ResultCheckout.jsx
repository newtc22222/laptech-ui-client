/** @format */

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { historyService, orderService } from '../../../services';
import { Box, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { numberWithCommas } from '../../../utils';
import { Helmet } from 'react-helmet';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
const dataUser = JSON.parse(localStorage.getItem('loginClient')) || {};
const { user } = dataUser || {};

const ResultCheckout = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [result, setResult] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const invoiceDataParam = searchParams.get('invoiceId');

  const [dataInvoice, setDataInvoice] = useState([]);
  useEffect(() => {
    orderService.getOrderById(invoiceDataParam).then((res) => {
      if (res.status === 200) setDataInvoice(res.data);
    });
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (Number(searchParam.get('resultCode')) === 0) {
      setResult(true);
      orderService.updateOrder(invoiceDataParam, { isPaid: true, updateBy: 'system', paymentType: 'momo' });
      const data = JSON.stringify({ status: 'PREPARED', updateBy: user?.name });
      historyService.updateHistoryOrder(invoiceDataParam, data);
    } else {
      orderService.updateOrder(invoiceDataParam, { isPaid: false, updateBy: 'system', paymentType: 'momo' });
      const data = JSON.stringify({ status: 'PENDING', updateBy: user?.name });
      historyService.updateHistoryOrder(invoiceDataParam, data);
    }
  }, []);

  return (
    <div className="h-[120vh] pt-[80px] flex items-center justify-center">
      {result ? (
        <>
          <Container style={{ maxWidth: '700px', minHeight: '800px', position: 'relative' }}>
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
              <Grid container spacing={2} style={{ padding: '60px 0' }}>
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
                  <Typography style={{ fontSize: '1.5rem' }}>{dataInvoice?.address}</Typography>
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
                    {numberWithCommas(dataInvoice?.paymentTotal)} đ
                  </Typography>
                </Grid>
              </Grid>

              <div
                style={{
                  maxWidth: '700px',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bottom: '5%',
                }}
              >
                <img src="https://media.tenor.com/h7f8fT6rAMoAAAAC/pio-chick.gif" alt="..." />
              </div>
            </Paper>
            <Button
              fullWidth
              variant="text"
              style={{
                fontSize: '16px',
                width: '100%',
                height: '40px',
                marginTop: '20px',
                backgroundColor: '#04aa6d',
                color: '#fff',
              }}
              onClick={() => navigate('/')}
            >
              Quay về trang chủ
            </Button>
          </Container>
        </>
      ) : (
        <>Thanh toán thất bại!</>
      )}
    </div>
  );
};

export default ResultCheckout;
