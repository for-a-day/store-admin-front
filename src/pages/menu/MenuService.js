// src/services/categoryService.js

import axios from 'axios';

export const STATE = {
  DEFAULT: 'default',
  MENU_UPDATE: 'menuUpdate',
  MENU_CREATE: 'menuCreate',
  CATEGORY_CREATE: 'categoryCreate',
  CATEGORY_UPDATE: 'categoryUpdate',
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:9001/admin/category');
    if  (response.status !== 200)  {
      throw new Error('서버 응답 오류');
    }
    const categoryList = response.data.data.categoryList;
    if (categoryList) {
      categoryList.sort((a, b) => a.categoryNo - b.categoryNo);
    }
    return categoryList;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const deleteCategory = async (categoryNo) => {
  try {
    const response = await axios.delete(`http://localhost:9001/admin/category?categoryNo=${categoryNo}`);
    if  (response.status !== 200)  {
      throw new Error('서버 응답 오류');
    }
    return response.data;
  } catch (error) {
    console.error('카테고리 삭제 실패:', error.message);
    throw error;
  }
};



export const fetchMenus = async (categoryNo) => {

  if(categoryNo < 0){
    return null;
  }

  try {
    const response = await axios.get(`http://localhost:9001/admin/menuList?categoryNo=${categoryNo}`);
    const menuList = response.data.data.menuList;
    if (menuList) {
      menuList.sort((a, b) => {
        if (b.state !== a.state) {
          return b.state - a.state;
        } else {
          return a.menuNo - b.menuNo;
        }
      });
    }
    return menuList;
  } catch (error) {
    console.error('Error fetching menus:', error);
    throw error;
  }
};


export const getMenu = async (menuNo) => {
  try {
    const response = await axios.get(`http://localhost:9001/admin/menu?menuNo=${menuNo}`);
    const menu = response.data.data.menu;
    
    return menu;
  } catch (error) {
    console.error('Error get menu:', error);
    throw error;
  }
};
