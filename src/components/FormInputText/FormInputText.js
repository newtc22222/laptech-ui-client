/** @format */

import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import React from 'react';

const FormInputText = ({
  name,
  control,
  label,
  error,
  disabled = false,
  type = 'text',
  multiline = false,
  rows = undefined,
  textFieldProps,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <TextField
        error={!!error}
        label={label}
        variant="outlined"
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        type={type}
        multiline={multiline}
        rows={rows}
        helperText={error?.message}
        fullWidth
        {...textFieldProps}
        inputProps={{ style: { fontSize: 15 } }}
        InputLabelProps={{ style: { fontSize: 12 } }}
      />
    )}
  />
);

FormInputText.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  error: PropTypes.object,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

export default FormInputText;
