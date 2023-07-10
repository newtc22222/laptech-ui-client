/** @format */

import { Grid, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react';
import FormInputText from '../../../../components/FormInputText/FormInputText';

const FormUpdatePassword = ({ control, errors, showNewPassword, handleClickShowNewPassword }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <FormInputText
        name="newPassword"
        type={showNewPassword ? 'text' : 'password'}
        label="Mật khẩu mới"
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
      <FormInputText name="token" type="text" label="Reset password token" control={control} error={errors.token} />
    </Grid>
  </Grid>
);

export default FormUpdatePassword;
