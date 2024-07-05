import React, { useState, useEffect } from 'react';
import MenuCard from '../../components/BaseCard/MenuCard';
import FormLayouts from '../../views/FormLayouts/FormLayouts';
import AddIcon from '@mui/icons-material/Add';

import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  MenuItem,
} from '@mui/material';

const MenuCreateForm = ({ setState, menuChange, nowCategoryNo, handelCancle, handlePopupOpen }) => {
  const handleCancelClick = () => {
    console.log('취소 버튼이 클릭되었습니다.');
    handelCancle();
  };

  const handleConfirmClick = () => {
    console.log('확인 버튼이 클릭되었습니다.');

    // 입력한 카테고리 이름 가져오기
    const menuName = document.getElementById('menu-name').value;
    const menuCode = document.getElementById('menu-code').value;
    const description = document.getElementById('description').value;
    const menuPrice = document.getElementById('menu-price').value;
    const supplyPrice = document.getElementById('supply-price').value;

    // 서버에 데이터 전송
    fetch('http://localhost:9001/admin/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        menuName: menuName,
        menuId: menuCode,
        description: description,
        price: menuPrice,
        supplyPrice: supplyPrice,
        categoryNo: nowCategoryNo,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('서버 응답 오류');
          handlePopupOpen('서버 응답 오류');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        menuChange();
        setState('default'); // 폼 닫기
      })
      .catch((error) => {
        handlePopupOpen('메뉴 추가 실패');
        console.error('메뉴 추가 실패:', error.message);
      });
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
              메뉴 추가하기
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

export default MenuCreateForm;
