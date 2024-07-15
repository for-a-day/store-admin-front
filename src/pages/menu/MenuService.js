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
  try {
    const response = await fetch("http://localhost:9001/admin/category", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryName: categoryName,
      }),
    });

    if (response.status !== 200) {
      console.log("111111111");
      alert('서버 응답 오류');
      return "error";
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        alert('카테고리 추가에 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
    return "error";
  }
};



export const fetchCategories = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    };

    const response = await axios.get('http://localhost:9001/admin/category', config);
   
    if (response.status !== 200) {
      alert('서버 응답 오류');
      return 'error';
    }
    const categoryList = response.data.data.categoryList;
    if (categoryList) {
      categoryList.sort((a, b) => a.categoryNo - b.categoryNo);
    }
    return categoryList;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        alert('카테고리 정보 조회에 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
    throw error;
  }
  
};

export const deleteCategory = async (categoryNo) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
        // 다른 헤더들도 필요한 경우 추가 가능
      }
    };

    const response = await axios.delete(`http://localhost:9001/admin/category?categoryNo=${categoryNo}`, config);
   
    if (response.status !== 200) {
      alert('서버 응답 오류');
      return 'error';
    }
    return response;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        alert('카테고리 삭제 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
    throw error;
  }
  
};


export const fetchMenus = async (categoryNo) => {
  if (categoryNo < 0) {
    return 'error';
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
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
      alert('서버 응답 오류');
      return 'error';
    }
    return menuList;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        alert('메뉴 목록 정보 조회에 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
    throw error;
  }
};



export const getMenu = async (menuNo) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
        // 다른 헤더들도 필요한 경우 추가 가능
      }
    };
    const response = await axios.get(`http://localhost:9001/admin/menu?menuNo=${menuNo}`, config);
    if (response.status !== 200) {
      alert('서버 응답 오류');
      return 'error';
    }
    const menu = response.data.data.menu;
    return menu;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        alert('메뉴 정보 조회에 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
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
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      alert('서버 응답 오류');
      return 'error';
    }
    return response;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        alert('메뉴 생성에 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
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
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      alert('서버 응답 오류');
      return 'error';
    }
    return response;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        alert('메뉴 수정에 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
    throw error;
  }
};


export const deleteMenu = async (menuNo) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    };
    const response = await axios.delete(
      `http://localhost:9001/admin/menu?menuNo=${menuNo}`, config
    );
    if (response.status !== 200) {
      alert('서버 응답 오류');
      return 'error';
    }
    return response;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        alert('메뉴 삭제에 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
    throw error;
  }
};