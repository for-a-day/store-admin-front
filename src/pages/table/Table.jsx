import React from 'react';

import { Card, CardContent, Box, Typography } from '@mui/material';

import TOTable from './TOTable';
const Table = () => {
  return (
    <div>
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3">테이블 조회</Typography>
            <Box
              sx={{
                overflow: {
                  xs: 'auto',
                  sm: 'unset',
                },
              }}
            >
              <TOTable />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Table;
