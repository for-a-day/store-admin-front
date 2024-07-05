import React, { useState, useEffect } from 'react';
import MenuCard from '../../components/BaseCard/MenuCard';
import {
  Box,
  ListItemText,
  Button,
  Grid,
  
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

const Menus = ({categoryDelete, setState, menuItem, setNow, nowMenu}) => {

  const categoryDeleteClick = () => {
    categoryDelete();
  };

  const handleClick = (menuNo) => {
    setNow(menuNo);
  };

  // 메뉴 생성 화면 이동
  const menuCreateClick = () => {
    console.log('Add menu clicked');
    setState("menuCreate");
  };

  
  return (
    <Box>
      <Grid container spacing={2}>
        {menuItem && menuItem.map((item) => (
          <Grid item key={item.menuNo} xs={12} sm={6} md={4} lg={3}
          
          >
            <MenuCard title={item.menuName}>
            <Box
            sx={{
              textAlign: 'center',
              height: 50,
              width: 50,
              cursor: 'pointer',
              ...(nowMenu === item.menuNo && {
                color: 'white',
                backgroundColor: (theme) => `${theme.palette.primary.main}!important`,
              }),
            }}
            onClick={() => handleClick(item.menuNo)}
            >

                <ListItemText>{item.menuImage}</ListItemText>
            </Box>
             
            </MenuCard>
          </Grid>
        ))}
        
        <Grid item key={'add'} xs={12} sm={6} md={4} lg={3}>
          <MenuCard title="메뉴 추가하기">
            <Box
              sx={{
                textAlign: 'center',
                height: 50,
                width: 50,
                cursor: 'pointer',
              }}
              onClick={menuCreateClick}
            >
              {<AddIcon sx={{ fontSize: 80 }} />}
            </Box>
          </MenuCard>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mt: 2 }}
      >
        <Button variant="contained" color="primary" onClick={categoryDeleteClick}>
          카테고리 삭제
        </Button>
      </Grid>
    </Box>
  );
};

export default Menus;
