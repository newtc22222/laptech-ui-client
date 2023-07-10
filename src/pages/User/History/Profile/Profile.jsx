/**
 * /* eslint-disable no-use-before-define
 *
 * @format
 */

/** @format */

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Grid, Paper } from '@material-ui/core';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator';
import { userService } from '../../../../services';
import FormDataUser from './FormDataUser';

const Profile = () => {
  const [requesting, setRequesting] = useState(true);

  const [disabled, setDisabled] = useState(true);
  const [show, setShow] = useState('none');

  const schema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên'),
    email: Yup.string().required('Vui lòng nhập email'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: 'FEMALE',
      dateOfBirth: '01/01/2023',
      email: '',
      name: '',
      phone: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    setRequesting(true);
    userService.getCurrentUser().then((res) => {
      if (res.status === 200) {
        reset(res.data.user);
        setRequesting(false);
      }
    });
  }, [reset]);

  const handleShowButtonClick = () => {
    setShow('flex');
    setDisabled(false);
  };

  const handleHideButtonClick = () => {
    setShow('none');
    setDisabled(true);
  };

  const handleClick = (data) => {
    const dataUser = {
      ...data,
      dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD'),
    };

    userService.editUser(dataUser).then((res) => {
      if (res.status === 200) {
        toast.success('Chỉnh sửa thông tin thành công !');
        toast.clearWaitingQueue();
        setShow('none');
        setDisabled(true);
      }
    });
  };

  return (
    <>
      <LoadingIndicator loading={requesting} />

      <section className="flex items-center h-[100vh] px-[20px]">
        <Helmet>
          <title>Laptech.com | Hồ sơ</title>
          <meta name="description" content="Description of Profile" />
        </Helmet>
        <Container maxWidth="md">
          <Paper>
            <h2 className="text-center font-bold pt-4">HỒ SƠ CỦA TÔI</h2>
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
              <Grid item xs={10}>
                <FormDataUser control={control} errors={errors} disabled={disabled} />
              </Grid>
              <Grid container item xs={10} spacing={2} style={{ padding: 0, paddingTop: 20 }}>
                {show === 'flex' && (
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      style={{
                        padding: 10,
                        width: '100%',
                        height: 40,
                        fontSize: 16,
                      }}
                      onClick={handleHideButtonClick}
                    >
                      Hủy
                    </Button>
                  </Grid>
                )}

                {show === 'none' && (
                  <Grid item xs={12}>
                    <Button
                      style={{
                        background: '#04aa6d',
                        padding: 10,
                        width: '100%',
                        color: '#FFFFFF',
                        height: 40,
                        fontSize: 16,
                      }}
                      onClick={handleShowButtonClick}
                    >
                      Sửa
                    </Button>
                  </Grid>
                )}
                <Grid item xs={6}>
                  <Button
                    style={{
                      background: '#04aa6d',
                      padding: 10,
                      color: '#FFFFFF',
                      display: show,
                      height: 40,
                      width: '100%',
                      fontSize: 16,
                    }}
                    onClick={handleSubmit(handleClick)}
                  >
                    Lưu
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </section>
    </>
  );
};
export default Profile;
