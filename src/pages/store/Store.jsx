import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Divider,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import StoreTable from "./StoreTable";

const Store = () => {
  const [reload, setReload] = useState(false);
  const loading = () => {
    setReload(!reload);
  };

  return (
    <div>
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3">지점 관리</Typography>
            <Box
              sx={{
                overflow: {
                  xs: "auto",
                  sm: "unset",
                },
              }}
            >
              <StoreTable />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              ></div>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Store;
