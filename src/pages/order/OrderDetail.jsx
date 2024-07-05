import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Button,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { getOrderDetail, orderComplete } from './OrderService';

const OrderDetail = ({ nowTable, loading, nowTableName }) => {
  const [order, setOrder] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await getOrderDetail(nowTable);
        const total = response.orderList.reduce((sum, order) => sum + order.amount, 0);
        setTotalAmount(total);
        setOrder(response);
        console.log(order);
      } catch (error) {}
    };
    fetchOrderDetail();
  }, []);

  const clickClear = async () => {
    try {
      const response = await orderComplete(order.tableNo);
      setOpenDialog(false);
      loading();
    } catch (error) {}
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div>
        <Card variant="outlined">
          <Box sx={{ padding: '15px 30px' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>주문 내역</Typography>
          </Box>
          <Divider />
          <CardContent sx={{ padding: '30px' }}>
            <Box>
              <Typography variant="body1">{nowTableName}</Typography>
              <ListItemText>
                <div>
                  {order &&
                    order.orderList.map((order) => (
                      <div key={order.orderNo}>
                        {order.orderMenuList &&
                          order.orderMenuList.map((menu) => (
                            <div
                              key={menu.menuNo}
                              style={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                              <span>{menu.menuName}</span>
                              <span>{menu.quantity}</span>
                            </div>
                          ))}
                        <div style={{ marginTop: '1rem' }}>{order.amount}</div>
                      </div>
                    ))}
                </div>

                <div style={{ marginTop: '1rem' }}>총 금액 : {totalAmount}</div>
              </ListItemText>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleClickOpenDialog}>
                Clear
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>테이블을 비우시겠습니까?</DialogTitle>
        <DialogContent>
          <DialogContentText>테이블 번호 : {order ? order.tableNo : ''}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            취소
          </Button>
          <Button onClick={clickClear} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderDetail;
