import React from "react";
import { Grid, Box } from "@mui/material";
import BaseCard from "../../components/BaseCard/BaseCard";
import FormLayouts from "../FormLayouts/FormLayouts";

import {
  BlogCard,
  SalesOverview,
  ProductPerformance,
  DailyActivities,
} from "./dashboard1-components";

const Dashboard1 = () => {
  // 2

  return (
    <Box>
    <Grid container spacing={2}>
      {/* ------------------------- row 1 ------------------------- */}

      {/* ------------------------- row 2 ------------------------- */}
      <Grid item xs={12} lg={8} container spacing={2} sx={{ mb:30}}>
        <Grid item xs={12} lg={4}>
          <BaseCard title="테이블 1">
            <Box sx={{ textAlign: "center", height:100 }}>
              야옹
            </Box>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <BaseCard title="테이블 2">
            <Box sx={{ textAlign: "center", height:100  }}>
              멍멍
            </Box>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <BaseCard title="테이블 3">
            <Box sx={{ textAlign: "center", height:100  }}>
              삐약
            </Box>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <BaseCard title="테이블 3">
            <Box sx={{ textAlign: "center", height:100  }}>
              테이블 더하기
            </Box>
          </BaseCard>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4}>
      <FormLayouts />
      </Grid>
      {/* ------------------------- row 3 ------------------------- */}
    </Grid>
  </Box>
  );
};

export default Dashboard1;
