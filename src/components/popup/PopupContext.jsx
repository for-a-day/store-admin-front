import React, { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState({
    open: false,
    message: "",
    onClose: null,
    showCancel: false, // 추가: 취소 버튼을 표시할지 여부
  });

  const openPopup = (message, onClose, showCancel = false) => {
    setPopup({ open: true, message, onClose, showCancel });
  };

  const handleClose = () => {
    if (popup.onClose) {
      popup.onClose();
    }
    setPopup({ open: false, message: "", onClose: null, showCancel: false });
  };

  const handleCancel = () => {
    setPopup({ open: false, message: "", onClose: null, showCancel: false });
  };

  return (
    <PopupContext.Provider value={{ openPopup }}>
      {children}
      <Dialog open={popup.open} onClose={handleClose}>
        <DialogTitle>알림</DialogTitle>
        <DialogContent>
          <DialogContentText>{popup.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {popup.showCancel && (
            <Button onClick={handleCancel} color="primary">
              취소
            </Button>
          )}
          <Button onClick={handleClose} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
