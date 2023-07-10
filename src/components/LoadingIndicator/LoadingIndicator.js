/** @format */

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingIndicator = ({loading}) => {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="success" />
      </Backdrop>
    </div>
  );
};

export default LoadingIndicator;
