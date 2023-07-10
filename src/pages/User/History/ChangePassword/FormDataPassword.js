/** @format */

import { Grid, IconButton, InputAdornment } from '@material-ui/core';
import React from 'react';
import FormInputText from '../../../../components/FormInputText/FormInputText';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const FormDataPassword = ({
  control,
  errors,
  showCurrentPassword,
  showNewPassword,
  authPassword,
  handleClickShowCurrentPassword,
  handleClickShowNewPassword,
  handleClickShowAuthPassword,
}) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <FormInputText
        name="currentPassword"
        type={showCurrentPassword ? 'text' : 'password'}
        label="Mật khẩu hiện tại"
        control={control}
        error={errors.currentPassword}
        textFieldProps={{
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowCurrentPassword} edge="end">
                  {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Grid>
    <Grid item xs={12}>
      <FormInputText
        name="newPassword"
        label="Mật khẩu mới"
        type={showNewPassword ? 'text' : 'password'}
        control={control}
        error={errors.newPassword}
        textFieldProps={{
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowNewPassword} edge="end">
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Grid>
    <Grid item xs={12}>
      <FormInputText
        name="authPassword"
        label="Xác nhận mật khẩu"
        type={authPassword ? 'text' : 'password'}
        control={control}
        error={errors.authPassword}
        textFieldProps={{
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowAuthPassword} edge="end">
                  {authPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Grid>
  </Grid>
);

export default FormDataPassword;
