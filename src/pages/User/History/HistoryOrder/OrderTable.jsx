/** @format */

import {
  IconButton,
  Tab,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Grid } from '@mui/material';
import { Divider } from 'antd';
import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AlertDialog from '../../../../components/AlertDialog/AlertDialog';
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator';
import { historyService, productService } from '../../../../services';
import { numberWithCommas } from '../../../../utils';
import { convertUTCDate } from '../../../../utils/ConvertUTCDate';
import EmptyOrder from './EmptyOrder';
const columns = [
  { id: 'id', label: 'Mã đơn hàng', align: 'center', minWidth: 100 },
  { id: 'product', label: 'Sản phẩm', format: 'product', align: 'center', minWidth: 50 },
  { id: 'paymentAmount', label: 'Số lượng', align: 'center', minWidth: 80 },

  {
    id: 'paymentTotal',
    label: 'Giá',
    format: 'money',
    align: 'center',
    minWidth: 80,
  },
  {
    id: 'address',
    label: 'Địa chỉ',
    align: 'left',
    minWidth: 150,
  },

  {
    id: 'orderStatus',
    label: 'Trạng thái',
    format: 'status',
    align: 'center',
    minWidth: 100,
  },
  { id: 'createdDate', label: 'Ngày đặt mua', format: 'date', align: 'center', minWidth: 100 },
  {
    id: 'cancel',
    label: 'Hủy',
    align: 'center',
    format: 'action',
    minWidth: 80,
  },
];

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: '50vh',

    [theme.breakpoints.up('xl')]: {
      maxHeight: '60vh',
    },
  },
  indicator: {
    display: 'none',
  },

  activeTab: {
    backgroundColor: 'rgb(4, 170, 109)',
    color: '#ffffff',
    fontSize: '14px',

    // Add any other styles you want for the active tab
  },
  tab: {
    fontSize: '14px',
    backgroundColor: '#ffffff',
    color: 'black',
  },
}));

const OrderTable = () => {
  const toTableCellContent = (value, format, row) => {
    switch (format) {
      case 'date': {
        return convertUTCDate(value);
      }
      case 'product': {
        return (
          <Tooltip title="Xem sản phẩm">
            <IconButton onClick={() => handleViewProduct(row.id)}>
              <Visibility fontSize="small" style={{ color: '#04aa6d' }} />
            </IconButton>
          </Tooltip>
        );
      }
      case 'money': {
        return numberWithCommas(value);
      }
      case 'action': {
        return row.orderStatus === 'PENDING' ? (
          <Tooltip title="Hủy đơn hàng">
            <IconButton onClick={() => handleCancel(row.id)}>
              <DeleteIcon fontSize="small" style={{ color: '#04aa6d' }} />
            </IconButton>
          </Tooltip>
        ) : (
          <DeleteIcon fontSize="small" style={{ color: 'gray' }} />
        );
      }

      case 'status': {
        return <span variant="outlined">{value}</span>;
      }

      default:
        return value;
    }
  };
  const classes = useStyles();
  const dataUser = JSON.parse(localStorage.getItem('loginClient')) || {};
  const { user } = dataUser || {};
  const [historyOrder, setHistoryOrder] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [detailProduct, setDetailProduct] = useState([]);
  const [requesting, setRequesting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState('');
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getHistoryOrder = () => {
      setLoading(true);
      historyService.getHistoryOrderByUserId(user.id).then((res) => {
        setHistoryOrder(res.data);
        setLoading(false);
      });
    };
    getHistoryOrder();
  }, [user.id]);

  const ordersReceived = historyOrder?.filter((order) => order.orderStatus === 'RECEIVED');
  const ordersPending = historyOrder?.filter((order) => order.orderStatus === 'PENDING');
  const ordersCanceled = historyOrder?.filter((order) => order.orderStatus === 'CANCELED');
  const ordersShipping = historyOrder?.filter((order) => order.orderStatus === 'SHIPPING');
  const ordersIgnored = historyOrder?.filter((order) => order.orderStatus === 'IGNORED');

  const handleViewProduct = (id) => {
    setRequesting(true);
    productService.getProductByOrderId(id).then((response) => {
      setDetailProduct(response.data);
      setRequesting(false);
      setOpenDialog(true);
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleConfirmDeleteAccept = () => {
    const data = JSON.stringify({ status: 'CANCELED', updateBy: user?.name });
    historyService.updateHistoryOrder(selectedRowId, data).then((res) => {
      if (res.status === 200) {
        toast.success('Hủy đơn hàng thành công !');
      } else {
        toast.error('Hủy đơn hàng thất bại !');
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
    setOpenConfirmDelete(false);
  };

  const handleCancel = (id) => {
    setSelectedRowId(id);
    setOpenConfirmDelete(true);
  };

  return (
    <>
      <LoadingIndicator loading={loading} />
      <div className="flex flex-col h-[100vh] py-[200px] px-[100px] ">
        <Helmet>
          <title>Laptech.com | Lịch sử đơn hàng</title>
          <meta name="description" content="Description of history order" />
        </Helmet>

        <TabContext value={value}>
          <TabList classes={{ indicator: classes.indicator }} onChange={handleChange} aria-label="lab API tabs example">
            <Tab className={value === '1' ? classes.activeTab : classes.tab} label="Tất cả" value="1" />
            <Tab className={value === '2' ? classes.activeTab : classes.tab} label="Chờ thanh toán" value="2" />
            <Tab className={value === '3' ? classes.activeTab : classes.tab} label="Vận chuyển" value="3" />
            <Tab className={value === '4' ? classes.activeTab : classes.tab} label="Hoàn thành" value="4" />
            <Tab className={value === '5' ? classes.activeTab : classes.tab} label="Đã hủy" value="5" />
            <Tab className={value === '6' ? classes.activeTab : classes.tab} label="Trả hàng/Hoàn tiền" value="6" />
          </TabList>

          <TabPanel style={{ padding: 0 }} value="1">
            <Grid container>
              {historyOrder.length > 0 ? (
                <Grid item xs={12} style={{ zIndex: 0 }}>
                  <TableContainer className={classes.container}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                fontWeight: 'bold',
                                padding: 0,
                                height: 50,
                                fontSize: '14px',
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      {historyOrder?.map((item, index) => (
                        <TableBody key={index}>
                          <TableRow hover>
                            {columns.map((column) => {
                              const value = item[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    minWidth: column.minWidth,
                                    fontSize: '14px',
                                  }}
                                >
                                  {toTableCellContent(value, column.format, item)}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableBody>
                      ))}
                    </Table>
                  </TableContainer>

                  <AlertDialog
                    open={openConfirmDelete}
                    onClose={handleCloseConfirmDelete}
                    title="Confirm Deletion"
                    content={`Bạn có chắc muốn hủy đơn hàng này không?`}
                    leftButton="No"
                    onClickLeftButton={handleCloseConfirmDelete}
                    rightButton="Yes"
                    onClickRightButton={handleConfirmDeleteAccept}
                  />
                </Grid>
              ) : (
                <EmptyOrder />
              )}
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid container>
              {ordersPending.length > 0 ? (
                <Grid item xs={12} style={{ zIndex: 0 }}>
                  <TableContainer className={classes.container}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                fontWeight: 'bold',
                                padding: 0,
                                height: 50,
                                fontSize: '14px',
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      {ordersPending?.map((item, index) => (
                        <TableBody key={index}>
                          <TableRow hover>
                            {columns.map((column) => {
                              const value = item[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    minWidth: column.minWidth,
                                    fontSize: '14px',
                                  }}
                                >
                                  {toTableCellContent(value, column.format, item)}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableBody>
                      ))}
                    </Table>
                  </TableContainer>

                  <AlertDialog
                    open={openConfirmDelete}
                    onClose={handleCloseConfirmDelete}
                    title="Confirm Deletion"
                    content={`Bạn có chắc muốn hủy đơn hàng này không?`}
                    leftButton="No"
                    onClickLeftButton={handleCloseConfirmDelete}
                    rightButton="Yes"
                    onClickRightButton={handleConfirmDeleteAccept}
                  />
                </Grid>
              ) : (
                <EmptyOrder />
              )}
            </Grid>
          </TabPanel>
          <TabPanel value="3">
            <Grid container>
              {ordersShipping.length > 0 ? (
                <Grid item xs={12} style={{ zIndex: 0 }}>
                  <TableContainer className={classes.container}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                fontWeight: 'bold',
                                padding: 0,
                                height: 50,
                                fontSize: '14px',
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      {ordersShipping?.map((item, index) => (
                        <TableBody key={index}>
                          <TableRow hover>
                            {columns.map((column) => {
                              const value = item[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    minWidth: column.minWidth,
                                    fontSize: '14px',
                                  }}
                                >
                                  {toTableCellContent(value, column.format, item)}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableBody>
                      ))}
                    </Table>
                  </TableContainer>

                  <AlertDialog
                    open={openConfirmDelete}
                    onClose={handleCloseConfirmDelete}
                    title="Confirm Deletion"
                    content={`Bạn có chắc muốn xóa đơn hàng này không?`}
                    leftButton="No"
                    onClickLeftButton={handleCloseConfirmDelete}
                    rightButton="Yes"
                    onClickRightButton={handleConfirmDeleteAccept}
                  />
                </Grid>
              ) : (
                <EmptyOrder />
              )}
            </Grid>
          </TabPanel>

          <TabPanel value="4">
            <Grid container>
              {ordersReceived.length > 0 ? (
                <Grid item xs={12} style={{ zIndex: 0 }}>
                  <TableContainer className={classes.container}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                fontWeight: 'bold',
                                padding: 0,
                                height: 50,
                                fontSize: '14px',
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      {ordersReceived?.map((item, index) => (
                        <TableBody key={index}>
                          <TableRow hover>
                            {columns.map((column) => {
                              const value = item[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    minWidth: column.minWidth,
                                    fontSize: '14px',
                                  }}
                                >
                                  {toTableCellContent(value, column.format, item)}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableBody>
                      ))}
                    </Table>
                  </TableContainer>

                  <AlertDialog
                    open={openConfirmDelete}
                    onClose={handleCloseConfirmDelete}
                    title="Confirm Deletion"
                    content={`Bạn có chắc muốn xóa đơn hàng này không?`}
                    leftButton="No"
                    onClickLeftButton={handleCloseConfirmDelete}
                    rightButton="Yes"
                    onClickRightButton={handleConfirmDeleteAccept}
                  />
                </Grid>
              ) : (
                <EmptyOrder />
              )}
            </Grid>
          </TabPanel>
          <TabPanel value="5">
            <Grid container>
              {ordersCanceled.length > 0 ? (
                <Grid item xs={12} style={{ zIndex: 0 }}>
                  <TableContainer className={classes.container}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                fontWeight: 'bold',
                                padding: 0,
                                height: 50,
                                fontSize: '14px',
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      {ordersCanceled?.map((item, index) => (
                        <TableBody key={index}>
                          <TableRow hover>
                            {columns.map((column) => {
                              const value = item[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    minWidth: column.minWidth,
                                    fontSize: '14px',
                                  }}
                                >
                                  {toTableCellContent(value, column.format, item)}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableBody>
                      ))}
                    </Table>
                  </TableContainer>

                  <AlertDialog
                    open={openConfirmDelete}
                    onClose={handleCloseConfirmDelete}
                    title="Confirm Deletion"
                    content={`Bạn có chắc muốn xóa đơn hàng này không?`}
                    leftButton="No"
                    onClickLeftButton={handleCloseConfirmDelete}
                    rightButton="Yes"
                    onClickRightButton={handleConfirmDeleteAccept}
                  />
                </Grid>
              ) : (
                <EmptyOrder />
              )}
            </Grid>
          </TabPanel>
          <TabPanel value="6">
            <Grid container>
              {ordersIgnored.length > 0 ? (
                <Grid item xs={12} style={{ zIndex: 0 }}>
                  <TableContainer className={classes.container}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                fontWeight: 'bold',
                                padding: 0,
                                height: 50,
                                fontSize: '14px',
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      {ordersIgnored?.map((item, index) => (
                        <TableBody key={index}>
                          <TableRow hover>
                            {columns.map((column) => {
                              const value = item[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    minWidth: column.minWidth,
                                    fontSize: '14px',
                                  }}
                                >
                                  {toTableCellContent(value, column.format, item)}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableBody>
                      ))}
                    </Table>
                  </TableContainer>

                  <AlertDialog
                    open={openConfirmDelete}
                    onClose={handleCloseConfirmDelete}
                    title="Confirm Deletion"
                    content={`Bạn có chắc muốn xóa đơn hàng này không?`}
                    leftButton="No"
                    onClickLeftButton={handleCloseConfirmDelete}
                    rightButton="Yes"
                    onClickRightButton={handleConfirmDeleteAccept}
                  />
                </Grid>
              ) : (
                <EmptyOrder />
              )}
            </Grid>
          </TabPanel>
        </TabContext>
      </div>

      <>
        <LoadingIndicator loading={requesting} />
        <AlertDialog
          open={openDialog}
          onClose={handleCloseDialog}
          title="Sản phẩm đã đặt hàng"
          content={detailProduct?.map((detail, index) => (
            <>
              <div
                key={index}
                style={{
                  display: 'flex',
                  wordBreak: 'normal',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div className="flex flex-col">
                  <Link to={`/detail/${detail?.product?.id}`} className="font-semibold">
                    {detail?.product?.name}
                  </Link>
                  <div>
                    <div className="text-red-500 font-bold">{numberWithCommas(detail?.discountPrice)}₫</div>
                    <div className="line-through">{numberWithCommas(detail?.product?.listedPrice)}₫</div>
                    <div>Số lượng: {detail?.quantity} </div>
                  </div>
                  <Divider />
                </div>
                <img src={detail?.imageRepresent} width={150} height={150} alt="historyImage"></img>
              </div>
            </>
          ))}
          leftButton="Trở lại"
          onClickLeftButton={handleCloseDialog}
          maxWidth="md"
          fullWidth={true}
          fullWidthButton={false}
        />
      </>
    </>
  );
};

export default OrderTable;
