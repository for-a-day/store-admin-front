import { Box, Typography } from "@mui/material";
import React from "react";
import logoicn from "../../assets/images/nagane_light_b.png";

const MainList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh", // 전체 뷰포트 높이를 차지하도록 설정
        textAlign: "center", // 텍스트를 가운데 정렬
      }}
    >
      <Box sx={{ mt: 2 }}>
        {" "}
        {/* 이미지와 텍스트 사이의 간격 조정 */}
        <img
          alt="Logo"
          src={logoicn}
          style={{
            maxWidth: "auto",
            height: "auto",
            filter: "grayscale(100%)", // 이미지를 흑백으로 변경
          }}
        />
      </Box>

      <Typography
        variant="h1"
        sx={{ mt: 4, fontSize: "22px", fontWeight: "600" }}
      >
        원하시는 메뉴를 하단 바에서 선택해주세요
      </Typography>
    </Box>
  );
};

export default MainList;
