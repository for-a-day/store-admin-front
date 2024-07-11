import React from "react";

import { usePopup } from "../../components/popup/PopupContext";
import { createCategory } from "./MenuService";
import { Palette } from "../../components/palette/Palette";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const CategoryForm = ({ setState, categoryChange, handelCancle }) => {
  const { openPopup } = usePopup();
  const handleCancelClick = () => {
    console.log("취소 버튼이 클릭되었습니다.");
    handelCancle();
  };

  const handleConfirmClick = async () => {
    console.log("카테고리 추가 버튼이 클릭되었습니다.");
    // 입력한 카테고리 이름 가져오기
    const categoryName = document.getElementById("category-name").value;
    try {
      const response = await createCategory(categoryName);
      console.log("응답 : ", response);
      if (response !== "error") {
        console.log("33333333333");
        categoryChange();
        setState("default"); // 폼 닫기
        openPopup("카테고리 추가 성공");
      }
    } catch (error) {
      console.error("카테고리 추가 실패:", error.message);
      // openPopup("카테고리 추가 실패");
    }
  };

  return (
    <div>
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
                fontWeight: "600",
              }}
            >
              카테고리 추가
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          <form>
            <TextField
              id="category-name"
              label="카테고리 명"
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
                sx={{
                  color: Palette.sub,
                  background: Palette.red,
                  "&:hover": {
                    color: Palette.sub,
                    background: Palette.lightRed,
                  },
                }}
              >
                취소
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmClick}
                sx={{
                  color: Palette.sub,
                  background: Palette.main,
                  "&:hover": {
                    color: Palette.sub,
                    background: Palette.dark,
                  },
                }}
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

export default CategoryForm;
