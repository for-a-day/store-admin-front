import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Card, CardContent, Box, Typography } from '@mui/material';

import StockTable from './StockTable';

const Stock = () => {
  return (
    <div>
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3">재고 관리</Typography>
            <Box
              sx={{
                overflow: {
                  xs: 'auto',
                  sm: 'unset',
                },
              }}
            >
              <StockTable />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                }}
              ></div>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Stock;
