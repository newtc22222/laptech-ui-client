/** @format */

import { Grid } from '@material-ui/core';
import React from 'react';
import FormInputText from '../../../components/FormInputText/FormInputText';

const FormDataCart = ({ control, errors, disabled }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <FormInputText name="phone" label="Số điện thoại" type="number" control={control} error={errors.phone} />
    </Grid>
    <Grid item xs={12}>
      <FormInputText
        name="homeaddress"
        label="Số nhà, tên đường"
        control={control}
        error={errors.homeaddress}
        disabled={disabled}
      />
    </Grid>
    <Grid item xs={12}>
      <FormInputText name="note" label="Ghi chú" control={control} error={errors.note} />
    </Grid>
  </Grid>
);

export default FormDataCart;
