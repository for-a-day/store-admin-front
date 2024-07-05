import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const Categorys = ({ setState, categoryItem, setNow, nowCategory, loadMenus }) => {
  const [selectedCategory, setSelectedCategory] = React.useState(0);

  const handleAddCategory = () => {
    console.log('Add category clicked');
    setState("categoryCreate");
  };

  useEffect(() =>{
      if (categoryItem.length > 0) {
        const initialCategoryNo = categoryItem[0].categoryNo;
        setNow(initialCategoryNo);
        loadMenus(initialCategoryNo);
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
    loadMenus(categoryNo);
  };

  return (
    <Paper square>
      <Box display="flex" alignItems="center">
        <Tabs value={selectedCategory} onChange={handleTabChange} aria-label="Categories" sx={{ flexGrow: 1 }}>
          {categoryItem.map((category, index) => (
            <Tab key={index} label={category.categoryName} />
          ))}
        </Tabs>
        <Button variant="contained" color="primary" onClick={handleAddCategory} sx={{ ml: 2 }}>
          <AddIcon sx={{ fontSize: 20 }} />
        </Button>
      </Box>
    </Paper>
  );
};

export default Categorys;
