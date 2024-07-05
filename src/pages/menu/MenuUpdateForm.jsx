import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import axios from 'axios';

const MenuUpdateForm = ({ setState, menuItem, menuChange, nowCategoryNo, handlePopupOpen }) => {
  const [menuName, setMenuName] = useState('');
  const [menuId, setMenuId] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [supplyPrice, setSupplyPrice] = useState('');
  const [status, setStatus] = useState('active'); // 'active' or 'inactive'

  useEffect(() => {
    if (menuItem) {
      setMenuName(menuItem.menuName);
      setMenuId(menuItem.menuId);
      setDescription(menuItem.description);
      setPrice(menuItem.price);
      setSupplyPrice(menuItem.supplyPrice);
      setStatus(menuItem.state === 1 ? 'active' : 'inactive'); // Assuming 'status' is part of menuItem
    }
  }, [menuItem]);

  const handleDeleteClick = () => {
    console.log('삭제 버튼이 클릭되었습니다.');
    deleteMenu();
    menuChange();
    setState('default');
  };

  const handleConfirmClick = () => {
    console.log('확인 버튼이 클릭되었습니다.');

    // 서버에 데이터 전송
    fetch('http://localhost:9001/admin/menu', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        menuNo: menuItem.menuNo,
        menuName: menuName,
        menuId: menuId,
        description: description,
        price: price,
        supplyPrice: supplyPrice,
        categoryNo: nowCategoryNo,
        state: status === 'active' ? 1 : 0,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          handlePopupOpen('서버 응답 오류');
          throw new Error('서버 응답 오류');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        handlePopupOpen('수정 완료');
      })
      .catch((error) => {
        handlePopupOpen('메뉴 수정 실패');
        console.error('메뉴 수정 실패:', error.message);
      });
  };

  const deleteMenu = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:9001/admin/menu?menuNo=${menuItem.menuNo}`,
      );
      if (response.status !== 200) {
        handlePopupOpen('서버 응답 오류');
      }
      return response.data;
    } catch (error) {
      handlePopupOpen('메뉴 삭제 실패');
      console.error('메뉴 삭제 실패:', error.message);
    }
  };

  return (
    <div>
      <Card variant="outlined">
        <Box sx={{ padding: '15px 30px' }}>
          <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>메뉴 수정하기</Typography>
        </Box>
        <Divider />
        <CardContent sx={{ padding: '30px' }}>
          <form>
            <TextField
              id="menu-name"
              label="메뉴 이름"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              id="menu-code"
              label="메뉴 아이디"
              value={menuId}
              onChange={(e) => setMenuId(e.target.value)}
              type="text"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              id="description"
              label="메뉴 설명"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              id="menu-price"
              label="메뉴 가격"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              id="supply-price"
              label="재료 공급가"
              value={supplyPrice}
              onChange={(e) => setSupplyPrice(e.target.value)}
              type="number"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <RadioGroup
              aria-label="menu-status"
              name="menu-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ flexDirection: 'row', mb: 2 }}
            >
              <FormControlLabel value="active" control={<Radio />} label="판매 중" />
              <FormControlLabel value="inactive" control={<Radio />} label="판매 종료" />
            </RadioGroup>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="contained" color="error" onClick={handleDeleteClick}>
                삭제
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

export default MenuUpdateForm;
