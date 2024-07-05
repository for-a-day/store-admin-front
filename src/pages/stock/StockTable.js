import React, { useEffect, useState } from "react";

import axios from 'axios';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";


const StockTable = () => {
  const [stockList, setStockLIst] = useState([]);

  const [stockLoad, setStockLoad] = useState('active');
  const stockReload = () =>{
    setStockLoad(!stockLoad);
  }

  const getStocks = async () => {
    const storeNo = localStorage.getItem('storeNo');
    console.log(storeNo);
    try {
      const response = await axios.get(`http://localhost:9001/stock?storeNo=${storeNo}`);
      const stockLIst = response.data.data.stockList;
      setStockLIst(stockLIst);
    } catch (error) {
      console.error('Error get stocks:', error);
      throw error;
    }
  }

  useEffect(()=>{getStocks();}, [stockLoad]);

  const orderCompleteClick = (porderNo) => {
    try {
      purchaseOrderComplete(porderNo);
    } catch (error) {
      console.error('Error get orderComplete:', error);
      throw error;
    }

  }
  
  const purchaseOrderComplete = async (porderNo) => {
    const state = 1;

    fetch('http://localhost:9001/purchaseOrder', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state: state,
        porderNo: porderNo,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('서버 응답 오류');
        }
        return response.json();
      })
      .then((data) => {
        stockReload();
        console.log(data);
      })
      .catch((error) => {
        console.error('입고 완료 실패:', error.message);
      });
  };

  
  const orderClick = () => {
    if(selectedStock){
        try {
          purchaseOrder();
        } catch (error) {
          console.error('발주 실패 Error :', error);
          throw error;
        }
    }
    else{
      console.error('발주 실패');
    }
  }

  const purchaseOrder = async () => {
    fetch('http://localhost:9001/purchaseOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: poQuantity,
        stockNo: selectedStock.stockNo,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('서버 응답 오류');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        stockReload();
      })
      .catch((error) => {
        console.error('발주 신청 실패:', error.message);
      });
  };

    

  const [openPoDialog, setOpenPoDialog] = useState(false);
  const [openQuantityDialog, setOpenQuantityDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [poQuantity, setPoQuantity] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleClickOpenPoDialog = (stock) => {
    setSelectedStock(stock);
    setPoQuantity(stock.poQuantity);
    setOpenPoDialog(true);
  };

  const handleClickOpenQuantityDialog = (stock) => {
    setSelectedStock(stock);
    setQuantity(stock.quantity);
    setOpenQuantityDialog(true);
  };

  const handleClosePoDialog = () => {
    setOpenPoDialog(false);
    setSelectedStock(null);
    setPoQuantity("");
  };

  const handleCloseQuantityDialog = () => {
    setOpenQuantityDialog(false);
    setSelectedStock(null);
    setQuantity("");
  };

  const handlePoQuantityChange = (e) => {
    setPoQuantity(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSavePoQuantity = () => {
    orderClick();
    handleClosePoDialog();
  };

  const handleSaveQuantity = () => {
    if (selectedStock) {
      selectedStock.quantity = quantity;
    }
    handleCloseQuantityDialog();
  };

  return (
    <>
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                No
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                상품명
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                재고량
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                발주량
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                최근 입고 날짜
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                관리
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockList && stockList.map((stock, index) => (
            <TableRow key={stock.stockNo}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {index + 1}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {stock.menuName}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  size="small"
                  label={stock.quantity}
                  onClick={() => handleClickOpenQuantityDialog(stock)}
                ></Chip>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      <Chip
                        sx={{
                          pl: "4px",
                          pr: "4px",
                          color: "#fff",
                          cursor: stock.poNo? 'default' : 'pointer',
                        }}
                        size="small"
                        label={stock.poQuantity}

                      ></Chip>
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {stock.poPrice}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">{stock.lastStockDate}</Typography>
              </TableCell>
              <TableCell align="right">
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", mt: 2 }}
                >
                  {stock.poNo ? (
                    <Button variant="contained" color="primary" onClick={() => orderCompleteClick(stock.poNo)}>
                      입고완료
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" onClick={() => handleClickOpenPoDialog(stock)}>
                      발주신청
                    </Button>
                  )}
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openPoDialog} onClose={handleClosePoDialog}>
        <DialogTitle>발주량 입력</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedStock ? (
              <>
                <Typography variant="h6">상품명: {selectedStock.menuName}</Typography>
                <TextField
                  autoFocus
                  margin="dense"
                  id="poQuantity"
                  label="발주량"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={poQuantity}
                  onChange={handlePoQuantityChange}
                />
              </>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePoDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleSavePoQuantity} color="primary">
            신청
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openQuantityDialog} onClose={handleCloseQuantityDialog}>
        <DialogTitle>재고량 입력</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedStock ? (
              <>
                <Typography variant="h6">상품명: {selectedStock.menuName}</Typography>
                <TextField
                  autoFocus
                  margin="dense"
                  id="quantity"
                  label="재고량"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQuantityDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleSaveQuantity} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StockTable;
