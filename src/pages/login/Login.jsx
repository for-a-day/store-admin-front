import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import axios from "axios";

const Login = ({ setLogin }) => {
  // const login = async () => {
  //   const adminId = document.getElementById("adminId").value;
  //   const adminPassword = document.getElementById("adminPassword").value;

  //   fetch("http://localhost:9001/admin/login", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       adminId: adminId,
  //       adminPassword: adminPassword,
  //     }),
  //   })
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         console.log("daafsdfiasfui");
  //         throw new Error("서버 응답 오류");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setLogin(true);
  //     })
  //     .catch((error) => {
  //       console.error("로그인 실패:", error.message);
  //     });
  // };

  const login = async () => {
    const adminId = document.getElementById("adminId").value;
    const adminPassword = document.getElementById("adminPassword").value;

    try {
      const response = await axios.post("http://localhost:9001/admin/login", {
        adminId,
        adminPassword,
      });
      console.log(response.data.admin);
      // JWT 토큰을 로컬 스토리지에 저장
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      // 로그인 성공 후 처리 (예: 리디렉션)
      alert("로그인 성공");
      setLogin(true);
    } catch (error) {
      alert("로그인 실패");
    }
  };

  return (
    <div>
      <Card variant="outlined">
        <Box sx={{ padding: "15px 30px" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
            로그인
          </Typography>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <TextField
              id="adminId"
              label="이름"
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              id="adminPassword"
              label="지점코드"
              type="text"
              fullWidth
              sx={{ mb: 2 }}
            />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button variant="contained" color="primary" onClick={login}>
                로그인
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
