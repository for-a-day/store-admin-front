import React, { useState, useEffect } from 'react';
import { Grid, Box, Divider } from '@mui/material';
import Categorys from './Categorys';
import CateforyForm from './CategoryForm';
import MenuCreateForm from './MenuCreateForm';
import MenuUpdateForm from './MenuUpdateForm';
import Menus from './Menus';
import { fetchCategories, deleteCategory, STATE, fetchMenus, getMenu } from './MenuService';

import { OkPopUp } from '../../components/popup/OkPopUp';
const Menu = () => {
  // 상세보기 관리
  const [state, setState] = useState(STATE.DEFAULT);

  // 카테고리 관련 변수
  const [categoryItem, setCategoryItem] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [nowCategoryNo, setNowCategoryNo] = useState(-1);

  const categoryChange = () => {
    setCategoryLoading(!categoryLoading);
  };

  const menuChange = () => {
    setMenuLoading(!menuLoading);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategoryItem(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    loadCategories();
  }, [categoryLoading]);

  // 메뉴 관련 변수
  const [menuItems, setMenuItems] = useState([]);
  const [menuItem, setMenuItem] = useState();
  const [menuLoading, setMenuLoading] = useState(true);
  const [nowMenuNo, setNowMenuNo] = useState(-1);
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const menu = await getMenu(nowMenuNo);
        setMenuItem(menu);
      } catch (error) {
        console.error('Error fetching menu', error);
      }
      if (nowMenuNo < 0) {
        setState('default');
      } else {
        setState('menuUpdate');
      }
    };
    loadMenu();
  }, [nowMenuNo]);

  const loadMenus = async (categoryNo) => {
    try {
      const menus = await fetchMenus(categoryNo);
      setMenuItems(menus);
      setNowMenuNo(-1);
    } catch (error) {
      handlePopupOpen('메뉴 목록 자져오기 실패 : ' + error);
      console.error('Error fetching menus:', error);
    }
  };

  useEffect(() => {}, [nowCategoryNo, menuLoading]);

  const categoryDeleteClick = async () => {
    try {
      const date = await deleteCategory(nowCategoryNo);
      categoryChange();
      setNowCategoryNo(-1);
      setState(STATE.DEFAULT);

      handlePopupOpen(date.message);
    } catch (error) {
      console.error('카테고리 삭제 실패:', error.message);
    }
  };

  // 팝업
  const [popupOpen, setPopupOpen] = useState(false);

  const [message, setMessage] = useState('');
  const [closeEvent, setCloseEvent] = useState(() => {});

  const handlePopupOpen = (message) => {
    setMessage(message);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    if (closeEvent) closeEvent();

    setPopupOpen(false);
  };

  const handelCancle = () => {
    if (nowMenuNo > 0) setState(STATE.MENU_UPDATE);
    else setState(STATE.DEFAULT);
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* 카테고리 */}
        <Grid item xs={12}>
          <Categorys
            setState={setState}
            categoryItem={categoryItem}
            setNow={setNowCategoryNo}
            nowCategory={nowCategoryNo}
            loadMenus={loadMenus}
          />
        </Grid>
        {/* 메뉴 목록 */}
        <Grid item xs={5}>
          {nowCategoryNo >= 0 ? (
            <Menus
              categoryDelete={categoryDeleteClick}
              setState={setState}
              menuItem={menuItems}
              setNow={setNowMenuNo}
              nowMenu={nowMenuNo}
            />
          ) : null}
        </Grid>
        <Grid item xs={1}>
          <Divider orientation="vertical" />
        </Grid>
        {/* 상세보기 */}
        <Grid item xs={6}>
          {state === STATE.MENU_UPDATE ? (
            <MenuUpdateForm
              setState={setState}
              menuItem={menuItem}
              menuChange={menuChange}
              nowCategoryNo={nowCategoryNo}
              handlePopupOpen={handlePopupOpen}
            />
          ) : state === STATE.MENU_CREATE ? (
            <MenuCreateForm
              setState={setState}
              menuChange={menuChange}
              nowCategoryNo={nowCategoryNo}
              handelCancle={handelCancle}
              handlePopupOpen={handlePopupOpen}
            />
          ) : state === STATE.CATEGORY_CREATE ? (
            <CateforyForm
              setState={setState}
              categoryChange={categoryChange}
              handelCancle={handelCancle}
              handlePopupOpen={handlePopupOpen}
            />
          ) : null}
        </Grid>
      </Grid>
      <OkPopUp message={message} open={popupOpen} handleClose={handlePopupClose} />
    </>
  );
};

export default Menu;
