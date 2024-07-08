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
    <div>
      {nowState === STATE.UPDATE ? (
        <StoreUpdateForm store={nowStore} setNowState={setNowState} />
      ) : nowState === STATE.LIST ? (
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
                <StoreTable
                  setNowState={setNowState}
                  setNowStore={setNowStore}
                />

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
        </Box>
      ) : (
        <StoreCreateForm setNowState={setNowState} />
      )}
    </div>
  );
};

export default Store;
