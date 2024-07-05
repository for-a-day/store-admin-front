import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent } from '@mui/material';
import SalesDashboard from './SalesDashboard';

const Sales = () => {
  return (
    <div>
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3">매출</Typography>
            <Box
              sx={{
                overflow: {
                  xs: 'auto',
                  sm: 'unset',
                },
              }}
            >
              <SalesDashboard />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Sales;
