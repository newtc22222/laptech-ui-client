/** @format */

import { Controller } from 'react-hook-form';
import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const RadioButtonGroup = ({ name, control, error, disabled }) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <FormControl>
        {/* <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel> */}
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="FEMALE"
          value={value}
          onChange={onChange}
          name="radio-buttons-group"
          error={!!error}
        >
          <div className="flex">
            <FormControlLabel value="FEMALE" control={<Radio />} label="Nữ" disabled={disabled} />
            <FormControlLabel value="MALE" control={<Radio />} label="Nam" disabled={disabled} />
            <FormControlLabel value="ORTHER" control={<Radio />} label="Khác" disabled={disabled} />
          </div>
        </RadioGroup>
      </FormControl>
    )}
  />
);

export default RadioButtonGroup;
