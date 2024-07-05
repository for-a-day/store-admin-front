import React, { useState, useEffect } from 'react';
import { Grid, Box, Divider } from '@mui/material';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';

const Order = () => {
  const [nowTable, setNowTable] = useState([-1]);

  const [reload, setReload] = useState(false);
  const loading = () => {
    setReload(!reload);
  };

  const [nowTableName, setTableName] = useState('');

  return (
    <>
      <Grid container spacing={2}>
        {/* 주문 목록 */}
        <Grid item xs={5}>
          <OrderList
            nowTable={nowTable}
            setNow={setNowTable}
            reload={reload}
            setTableName={setTableName}
          />
        </Grid>

        <Grid item xs={1}>
          <Divider orientation="vertical" />
        </Grid>
        {/* 상세보기 */}

        {nowTable > 0 ? (
          <Grid item xs={6}>
            <OrderDetail nowTable={nowTable} loading={loading} nowTableName={nowTableName} />
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default Order;
