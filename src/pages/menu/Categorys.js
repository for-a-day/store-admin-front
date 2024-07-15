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
import { styled  } from '@mui/system';

const CustomTab = styled(Tab)(({ theme }) => ({
  flex: '1',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '&.Mui-selected': {
    color: Palette.dark,
  },
}));


const Categorys = ({ setState, categoryItem, setNow }) => {
  const [selectedCategory, setSelectedCategory] = React.useState(0);

  const handleAddCategory = () => {
    console.log('Add category clicked');
    setState("categoryCreate");
  };


  const [nowCategoryNo, setNowNo] = useState(1);

  useEffect(() =>{
    if (categoryItem.length > 0) {
      const initialCategoryNo = categoryItem[0].categoryNo;
      setNow(initialCategoryNo);
      setNowNo(initialCategoryNo);
      setSelectedCategory(0); 
      console.log(initialCategoryNo);
    }
  }, [categoryItem]);

  const handleTabChange = (event, newValue) => {
    setSelectedCategory(newValue);
    const categoryNo = categoryItem[newValue].categoryNo;
    setNow(categoryNo);
    setNowNo(categoryNo);
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
      indicatorColor="primary" // 기본 색상 중 하나를 사용 (primary, secondary 등)
      TabIndicatorProps={{
        style: {
          backgroundColor: Palette.dark, // 원하는 색상으로 변경
        },
      }}
          // sx={{
          //   flexGrow: 1,
          //   '& .MuiTabs-scroller': {
          //     overflow: 'auto',
          //   },
          // }}
        >
          {categoryItem.map((category, index) => (
            <Tooltip key={index} title={category.categoryName}>
             <CustomTab label={category.categoryName} />
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
