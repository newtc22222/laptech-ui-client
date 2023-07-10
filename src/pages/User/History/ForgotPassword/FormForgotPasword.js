/** @format */

import { Grid, IconButton, InputAdornment } from '@material-ui/core';
import React from 'react';
import FormInputText from '../../../../components/FormInputText/FormInputText';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
const FormForgotPassword = ({ control, errors }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <FormInputText
        name="email"
        type="email"
        label="Email"
        control={control}
        error={errors.email}
        textFieldProps={{
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <EmailOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Grid>

    <Grid item xs={12}>
      <FormInputText
        name="phone"
        type="number"
        label="Số điện thoại "
        control={control}
        error={errors.phone}
        textFieldProps={{
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <PhoneAndroidOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Grid>
  </Grid>
);

export default FormForgotPassword;
