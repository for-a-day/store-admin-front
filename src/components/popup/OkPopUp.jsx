import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export const OkPopUp = ({ message, open, handleClose }) => {
  const [_open, setOpen] = useState(false);

  setOpen(open);

  return (
    <Dialog open={_open} onClose={handleClose}>
      <DialogTitle>알림</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose ? () => handleClose : () => setOpen(false)}
          color="primary"
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const openOkPopup = (message) => {
  return <OkPopUp message={message} open={true} />;
};
