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
import StoreUpdateForm from "./StoreUpdateForm";
import StoreCreateForm from "./StoreCreateForm";

const Store = () => {
  const [reload, setReload] = useState(false);
  const loading = () => {
    setReload(!reload);
  };

  const STATE = {
    LIST: "list",
    UPDATE: "update",
    CREATE: "create",
  };

  const [nowState, setNowState] = useState(STATE.LIST);
  const [nowStore, setNowStore] = useState(0);
  return (
    <Box sx={{ mt: 7 }}>
      {nowState === STATE.UPDATE ? (
        <StoreUpdateForm store={nowStore} setNowState={setNowState} />
      ) : nowState === STATE.LIST ? (
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="h3"
              sx={{ fontSize: "22px", fontWeight: "600" }}
            >
              지점 관리
            </Typography>
            <Box
              sx={{
                overflow: {
                  xs: "auto",
                  sm: "unset",
                },
              }}
            >
              <StoreTable setNowState={setNowState} setNowStore={setNowStore} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></div>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <StoreCreateForm setNowState={setNowState} />
      )}
    </Box>
  );
};

export default Store;
