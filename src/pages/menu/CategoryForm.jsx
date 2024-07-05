import React from 'react';

import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';

const CategoryForm = ({ setState, categoryChange, handelCancle, handlePopupOpen }) => {
  const handleCancelClick = () => {
    console.log('취소 버튼이 클릭되었습니다.');
    handelCancle();
  };

  const handleConfirmClick = () => {
    console.log('확인 버튼이 클릭되었습니다.');

    // 입력한 카테고리 이름 가져오기
    const categoryName = document.getElementById('category-name').value;

    // 입력한 카테고리 이름이 유효한지 검사 (예: 비어 있지 않은지)

    // 서버에 데이터 전송
    fetch('http://localhost:9001/admin/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryName: categoryName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          handlePopupOpen('서버 응답 오류');
          throw new Error('서버 응답 오류');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        categoryChange();
        setState('default'); // 폼 닫기
      })
      .catch((error) => {
        console.error('카테고리 추가 실패:', error.message);
        handlePopupOpen('카테고리 추가 실패');
        // 실패 시 사용자에게 알림을 주거나 다른 처리를 수행할 수 있습니다.
      });
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
            padding: '15px 30px',
          }}
          display="flex"
          alignItems="center"
        >
          <Box flexGrow={1}>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              카테고리 추가
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent
          sx={{
            padding: '30px',
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
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
              }}
            >
              <Button variant="contained" color="error" onClick={handleCancelClick}>
                취소
              </Button>
              <Button variant="contained" color="primary" onClick={handleConfirmClick}>
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
