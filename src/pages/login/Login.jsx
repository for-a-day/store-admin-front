import React from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { Palette } from "../../components/palette/Palette";
import Header from "../../layout/header/Header";

const Login = ({ setLogin }) => {
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
      sessionStorage.setItem("token", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      // 로그인 성공 후 처리 (예: 리디렉션)
      alert("로그인 성공");
      setLogin(true);
    } catch (error) {
      alert("로그인 실패");
    }
  };

  return (
    <div>
      <Header
        sx={{
          backgroundColor: Palette.main,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card variant="outlined" sx={{ width: 500 }}>
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
                label="아이디"
                type="text"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />

              <TextField
                id="adminPassword"
                label="비번"
                type="text"
                fullWidth
                sx={{ mb: 2 }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={login}
                  sx={{
                    color: Palette.sub,
                    background: Palette.main,
                    "&:hover": {
                      color: Palette.sub,
                      background: Palette.dark,
                    },
                  }}
                >
                  로그인
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Login;
