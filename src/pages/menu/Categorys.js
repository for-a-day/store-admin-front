import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Button,Tooltip
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Palette } from '../../components/palette/Palette';

const Categorys = ({ setState, categoryItem, setNow }) => {
  const [selectedCategory, setSelectedCategory] = React.useState(0);

  const handleAddCategory = () => {
    console.log('Add category clicked');
    setState("categoryCreate");
  };

  useEffect(() =>{
    if (categoryItem.length > 0) {
      const initialCategoryNo = categoryItem[0].categoryNo;
      setNow(initialCategoryNo);
      setSelectedCategory(0); 
      console.log(initialCategoryNo);
    }
  }, [categoryItem]);

  const handleTabChange = (event, newValue) => {
    setSelectedCategory(newValue);
    const categoryNo = categoryItem[newValue].categoryNo;
    setNow(categoryNo);
    setState("default");
    console.log(categoryNo);
  };

  return (
    <Paper square>
      <Box display="flex" alignItems="center">
        <Tabs
          value={selectedCategory}
          onChange={handleTabChange}
          aria-label="Categories"
          variant="scrollable"
          scrollButtons="auto"
          // sx={{
          //   flexGrow: 1,
          //   '& .MuiTabs-scroller': {
          //     overflow: 'auto',
          //   },
          // }}
        >
          {categoryItem.map((category, index) => (
            <Tooltip key={index} title={category.categoryName}>
            <Tab
              label={category.categoryName}
              style={{
                flex: '1',              // menuName이 가능한 공간을 최대한 차지
                whiteSpace: 'nowrap',   // 텍스트가 넘칠 때 줄바꿈을 막음
                overflow: 'hidden',     // 넘친 텍스트를 숨김
                textOverflow: 'ellipsis'
                
              }}
            />
          </Tooltip>
          ))}
        </Tabs>

        <Button 
          variant="contained"  
          display="flex"
          onClick={handleAddCategory}     
          sx={{
            ml: 2,
            color: Palette.sub,
            backgroundColor: Palette.main,
            '&:hover': {
              backgroundColor: Palette.dark, // 마우스 호버 시 변경할 색상 지정
            },
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
        </Button>
      </Box>
    </Paper>
  );
};

export default Categorys;
