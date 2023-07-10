/** @format */

import DateFnsUtils from '@date-io/date-fns';
import { Tooltip, makeStyles } from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles({
  pickerButton: {
    '& .MuiButtonBase-root': {
      padding: 0,
    },
  },
});

const FormInputDate = ({ name, control, label, disabled = false, error, format = 'dd/MM/yyyy', tooltip = '' }) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <KeyboardDatePicker
            format={format}
            error={!!error}
            helperText={error?.message}
            onChange={onChange}
            value={value}
            disabled={disabled}
            label={label}
            inputVariant="outlined"
            keyboardIcon={
              tooltip !== '' ? (
                <Tooltip arrow title={tooltip} placement="bottom-end">
                  <TodayIcon style={{ color: '#1E92F4' }} />
                </Tooltip>
              ) : (
                <TodayIcon />
              )
            }
            fullWidth
            className={classes.pickerButton}
          />
        )}
      />
    </MuiPickersUtilsProvider>
  );
};

export default FormInputDate;
