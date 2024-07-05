import React, { useState, useEffect } from 'react';

import { Card, CardContent, Box, Typography } from '@mui/material';

import OrderList from './OrderList';
import PaymentTable from './PaymentTable';

const Payment = () => {
  const [nowTable, setNowTable] = useState([-1]);

  const [onDetailPage, setOnDetailPage] = useState(false);

  return (
    <div>
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3">영수증 조회</Typography>
            <Box
              sx={{
                overflow: {
                  xs: 'auto',
                  sm: 'unset',
                },
              }}
            >
              <PaymentTable />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Payment;
