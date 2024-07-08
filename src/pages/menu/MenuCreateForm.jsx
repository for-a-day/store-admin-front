import React, { useState, useEffect } from "react";
import { usePopup } from "../../components/popup/PopupContext";
import { createMenu } from "./MenuService";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Input,
} from "@mui/material";

const MenuCreateForm = ({
  setState,
  menuChange,
  nowCategoryNo,
  handelCancle,
}) => {
  const { openPopup } = usePopup();

  const handleCancelClick = () => {
    console.log("취소 버튼이 클릭되었습니다.");
    handelCancle();
  };

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileURL = URL.createObjectURL(selectedFile);
      setFileUrl(fileURL);
    }
  };

  const handleConfirmClick = async () => {
    console.log("확인 버튼이 클릭되었습니다.");

    // 입력한 카테고리 이름 가져오기
    const menuName = document.getElementById("menu-name").value;
    const menuCode = document.getElementById("menu-code").value;
    const description = document.getElementById("description").value;
    const menuPrice = document.getElementById("menu-price").value;
    const supplyPrice = document.getElementById("supply-price").value;
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("menuName", menuName);
      formData.append("menuId", menuCode);
      formData.append("description", description);
      formData.append("price", menuPrice);
      formData.append("supplyPrice", supplyPrice);
      formData.append("categoryNo", nowCategoryNo);

      const response = await createMenu(formData);
      if (response.status && response.status != 200) {
        openPopup("서버 응답 오류");
      } else {
        menuChange();
        openPopup("메뉴 추가 완료");
      }
    } catch (error) {
      openPopup("메뉴 추가 실패");
    }
  };

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Checkbox */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Card
        variant="outlined"
        sx={{
          p: 0,
        }}
      >
        <Box
          sx={{
            padding: "15px 30px",
          }}
          display="flex"
          alignItems="center"
        >
          <Box flexGrow={1}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              메뉴 추가하기
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              height: 200,
              width: 200,
              border: "1px solid black", // 경계선 추가
              marginBottom: 2,
            }}
          >
            {fileUrl && (
              <img
                src={fileUrl}
                alt="Selected"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // 이미지가 박스 안에 맞도록 조정
                }}
              />
            )}
          </Box>

          <form>
            <Input
              id="menu-image"
              label="메뉴 이미지"
              type="file"
              variant="outlined"
              onChange={handleFileChange}
              fullWidth
              sx={{
                mb: 2,
              }}
            />

            <TextField
              id="menu-name"
              label="메뉴 이름"
              type="text"
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            />

            <TextField
              id="menu-code"
              label="메뉴 아이디"
              type="text"
              fullWidth
              sx={{
                mb: 2,
              }}
            />

            <TextField
              id="description"
              label="메뉴 설명"
              rows={4}
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            />

            <TextField
              id="menu-price"
              label="메뉴 가격"
              type="number"
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            />

            <TextField
              id="supply-price"
              label="재료 공급가"
              type="number"
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            />

            <Grid
              container
              spacing={0}
              sx={{
                mb: 2,
              }}
            ></Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleCancelClick}
              >
                취소
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmClick}
              >
                확인
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuCreateForm;
