// src/services/categoryService.js

import axios from 'axios';

export const STATE = {
  DEFAULT: 'default',
  MENU_UPDATE: 'menuUpdate',
  MENU_CREATE: 'menuCreate',
  CATEGORY_CREATE: 'categoryCreate',
  CATEGORY_UPDATE: 'categoryUpdate',
};


export const createCategory = async (categoryName) => {
  // 입력한 카테고리 이름이 유효한지 검사 (예: 비어 있지 않은지)

  // 서버에 데이터 전송
  fetch("http://localhost:9001/admin/category", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryName: categoryName,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("카테고리 추가 실패:", error.message);
      throw error;
    });
};


export const fetchCategories = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };

    const response = await axios.get('http://localhost:9001/admin/category', config);
   
    if (response.status !== 200) {
      return response;
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
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        // 다른 헤더들도 필요한 경우 추가 가능
      }
    };

    const response = await axios.delete(`http://localhost:9001/admin/category?categoryNo=${categoryNo}`, config);
   
    if (response.status !== 200) {
      return response;
    }
    return response;
  } catch (error) {
    console.error('카테고리 삭제 실패:', error.message);
    throw error;
  }
};


export const fetchMenus = async (categoryNo) => {
  if (categoryNo < 0) {
    return null;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    const response = await axios.get(`http://localhost:9001/admin/menu/list/${categoryNo}`, config);
    const menuList = response.data.data.menuList;
    if (menuList) {
      menuList.forEach(menu => {
        if (menu.imageByte) {
          const byteCharacters = atob(menu.imageByte);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);
          menu.imageUrl = imageUrl;
        } else if (menu.menuImage) {
          menu.imageUrl = `http://localhost:9001/images/${menu.menuImage}`;
        }

        console.log('메뉴 이미지 url : ', menu.imageUrl);
      });
    }
    if (response.status !== 200) {
      return response;
    }
    return menuList;
  } catch (error) {
    console.error('Error fetching menus:', error);
    throw error;
  }
};



export const getMenu = async (menuNo) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        // 다른 헤더들도 필요한 경우 추가 가능
      }
    };
    const response = await axios.get(`http://localhost:9001/admin/menu?menuNo=${menuNo}`, config);
    if (response.status !== 200) {
      return response;
    }
    const menu = response.data.data.menu;
    return menu;
  } catch (error) {
    console.error('Error get menu:', error);
    throw error;
  }
};


export const createMenu = async (menuData) => {
  try {

    const response = await axios.post(
      "http://localhost:9001/admin/menu",
      menuData,
      {
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error('서버 응답 오류');
    }
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const updateMenu = async (menuData) => {
  try {
    const response = await axios.put(
      "http://localhost:9001/admin/menu",
      menuData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error('서버 응답 오류');
    }
    return response;
  } catch (error) {
    console.error("Error update file:", error);
    throw error;
  }
};


export const deleteMenu = async (menuNo) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    const response = await axios.delete(
      `http://localhost:9001/admin/menu?menuNo=${menuNo}`, config
    );
    if (response.status !== 200) {
      throw new Error('서버 응답 오류');
    }
    return response;
  } catch (error) {
    console.error("메뉴 삭제 실패:", error.message);
    throw error;
  }
};