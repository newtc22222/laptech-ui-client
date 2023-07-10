/** @format */

import { Button, DialogContentText, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import * as React from 'react';

export default function AlertDialog(props) {
  const {
    open,
    onClose,
    title,
    content,
    rightButton,
    leftButton,
    onClickRightButton,
    onClickLeftButton,
    maxWidth = false,
    fullWidth = false,
    fullWidthButton = true,
  } = props;
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {leftButton && (
          <Button variant="outlined" color="primary" fullWidth={fullWidthButton} onClick={onClickLeftButton}>
            {leftButton}
          </Button>
        )}
        {rightButton && (
          <Button
            variant="contained"
            color="primary"
            fullWidth={fullWidthButton}
            onClick={onClickRightButton}
            autoFocus
          >
            {rightButton}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
