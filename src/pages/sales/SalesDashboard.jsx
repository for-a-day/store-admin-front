import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

const SalesDashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [dailySales, setDailySales] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  const [sales, setSales] = useState([]);

  const getSales = async () => {
    const storeNo = localStorage.getItem('storeNo');

    console.log(storeNo);
    try {
      const response = await axios.get(`http://localhost:9001/sales?storeNo=${storeNo}`);
      const salesDetail = response.data.data.salesDetail;
      console.log(response.data.data);
      console.log(salesDetail);
      setSales(salesDetail);
    } catch (error) {
      console.error('Error get stocks:', error);
      throw error;
    }
  };

  useEffect(() => {
    getSales();
    // Function to fetch sales data (mocked for example)
    fetchSalesData();
  }, []);

  const fetchSalesData = () => {
    // Mocked data, replace with actual API calls if available
    const dailySalesData = 15000; // Example daily sales amount
    const monthlySalesData = 450000; // Example monthly sales amount

    setDailySales(dailySalesData);
    setMonthlySales(monthlySalesData);

    // Update current date and time when data is fetched
    setCurrentDateTime(new Date());
  };

  // Function to update current date and time every second
  useEffect(() => {
    setCurrentDateTime(new Date());
  }, []);

  return (
    <Box>
      <Typography variant="body1" gutterBottom style={{ textAlign: 'right' }}>
        {currentDateTime.toLocaleString()} 기준
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                오늘 하루 매출
              </Typography>
              <Typography variant="body1">{sales.todaySalesCnt} 원</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                이번달 매출
              </Typography>
              <Typography variant="body1">{sales.thisMonthSalesCnt} 원</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                오늘 결제 건수
              </Typography>
              <Typography variant="body1">{sales.todayPaymentCnt} 건</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                이번달 결제 건수
              </Typography>
              <Typography variant="body1">{sales.thisMonthPaymentCnt} 건</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesDashboard;
