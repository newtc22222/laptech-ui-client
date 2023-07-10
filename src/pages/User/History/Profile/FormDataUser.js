/** @format */

import { Grid, InputAdornment } from '@material-ui/core';
import React from 'react';
import FormInputText from '../../../../components/FormInputText/FormInputText';
import RadioButtonGroup from '../../../../components/RadioButtonGroup/RadioButtonGroup';
import FormInputDate from '../../../../components/DatePicker/FormInputDate';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const FormDataUser = ({ control, errors, disabled }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <FormInputText
        name="phone"
        label="Số điện thoại"
        control={control}
        error={errors.phone}
        disabled={true}
        textFieldProps={{
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <PhoneAndroidOutlinedIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Grid>
    <Grid item xs={12}>
      <FormInputText
        name="name"
        label="Tên"
        control={control}
        error={errors.name}
        disabled={disabled}
        textFieldProps={{
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircleOutlinedIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Grid>
    <Grid item xs={12}>
      <FormInputText
        name="email"
        label="Email"
        control={control}
        error={errors.email}
        disabled={disabled}
        textFieldProps={{
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Grid>

    <Grid item xs={12}>
      <FormInputDate
        name="dateOfBirth"
        label="Ngày sinh"
        control={control}
        error={errors.dateOfBirth}
        disabled={disabled}
      />
    </Grid>
    <Grid item xs={12}>
      <RadioButtonGroup name="gender" control={control} error={errors.gender} label="Giới tính" disabled={disabled} />
    </Grid>
  </Grid>
);

export default FormDataUser;
