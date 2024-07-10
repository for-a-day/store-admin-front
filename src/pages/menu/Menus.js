import React, { useState, useEffect } from 'react';
import MenuCard from '../../components/BaseCard/MenuCard';
import { usePopup } from "../../components/popup/PopupContext";
import {
  Box,
  ListItemText,
  Button,
  Grid,
  
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import { Palette } from '../../components/palette/Palette';
import noImg from '../../assets/images/noImg.jpg'


const Menus = ({categoryDelete, setState, menuItem, setNow, nowMenu, setImageUrl}) => {


  const { openPopup } = usePopup();
  const categoryDeleteClick = () => {
    openPopup("정말로 삭제하시겠습니까?", categoryDelete, true);
  };



  const handleClick = (menuNo, imageUrl) => {
    setNow(menuNo);
    setImageUrl(imageUrl);
  };

  // 메뉴 생성 화면 이동
  const menuCreateClick = () => {
    console.log('Add menu clicked');
    setNow(0);
  };
  
  return (
    <Box>
      <Grid container spacing={2}>
        {menuItem && menuItem.map((item, index) => {
          menuItem.imageUrl = item.imageUrl;
          return (
            <Grid item key={item.menuNo} xs={12} sm={6} md={6} lg={6} 
            style={{
              minWidth: '180px', 
              maxWidth: '180px',
              maxHeight: '250px', 
              minHeight: '250px',
              }}>
              <MenuCard title={item.menuName}
                  background={nowMenu === item.menuNo? Palette.main: 'white'}
                  color={nowMenu === item.menuNo? Palette.sub: 'black'}
                  onClick={() => handleClick(item.menuNo, item.imageUrl)}
                  children= {
                    <Box
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      {item.imageUrl?  
                        <img 
                          src={item.imageUrl} 
                          alt={item.menuName} 
                          style={{ 
                            width: '80%', 
                            height: '80%', 
                            minHeight:100,
                            maxHeight:100,
                            objectFit: 'contain'
                          }} 
                        /> : 
                        <img alt="noImg" src={noImg}    
                          style={{ 
                            width: '80%', 
                            height: '80%', 
                            minHeight:100,
                            maxHeight:100,
                            objectFit: 'contain'
                          }} 
                        />
                      }  
                      <Grid item xs={1}>
                      </Grid>
                      {item.price ? item.price : '0'} 원
                    </Box>
                  }
                  />
            </Grid>
          )})}
          
        <Grid item key={'add'} xs={12} sm={6} md={4} lg={4}>
          <MenuCard 
            title="메뉴 추가하기"
            onClick={menuCreateClick}
            children={( 
              <AddIcon 
                sx={{ color: Palette.dark }}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  minHeight:100,
                  maxHeight:100,
                  objectFit: 'contain'
                }}  
              />
            )}
          />
        </Grid>
      </Grid>

      {menuItem && menuItem.length === 0 && (
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={categoryDeleteClick}
            sx={{
              color: Palette.sub,
              background: Palette.main,
              "&:hover": {
                color: Palette.sub,
                background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
              },
            }}
          >
            카테고리 삭제
          </Button>
        </Grid>
      )}


    </Box>
  );
};

export default Menus;
