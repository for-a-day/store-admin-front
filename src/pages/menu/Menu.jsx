import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Divider,
  experimentalStyled,
  Typography,
} from "@mui/material";
import Categorys from "./Categorys";
import CateforyForm from "./CategoryForm";
import MenuCreateForm from "./MenuCreateForm";
import MenuUpdateForm from "./MenuUpdateForm";
import Menus from "./Menus";
import { PopupProvider, usePopup } from "../../components/popup/PopupContext";
import {
  fetchCategories,
  deleteCategory,
  STATE,
  fetchMenus,
  getMenu,
} from "./MenuService";

const MainWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

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
        console.error("Error fetching categories:", error);
      }
    };
    loadCategories();
  }, [categoryLoading]);

  // 메뉴 관련 변수
  const [menuItems, setMenuItems] = useState([]);
  const [menuItem, setMenuItem] = useState();
  const [menuLoading, setMenuLoading] = useState(true);
  const [nowMenuNo, setNowMenuNo] = useState(-1);
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const menu = await getMenu(nowMenuNo);
        setMenuItem(menu);
      } catch (error) {
        console.error("Error fetching menu", error);
      }
      if (nowMenuNo < 0) {
        setState("default");
      } else if (nowMenuNo == 0) {
        setState("menuCreate");
      } else {
        setState("menuUpdate");
      }
    };
    loadMenu();
  }, [nowMenuNo]);

  useEffect(() => {
    const loadMenus = async (categoryNo) => {
      try {
        const menus = await fetchMenus(categoryNo);
        setMenuItems(menus);
        setNowMenuNo(-1);
        setState(STATE.DEFAULT);
        console.log("메뉴 목록 : ", menus);
      } catch (error) {
        // handlePopupOpen("메뉴 목록 자져오기 실패 : " + error);
        console.error("Error fetching menus:", error);
      }
    };
    loadMenus(nowCategoryNo);
  }, [nowCategoryNo, menuLoading, categoryLoading]);

  const { openPopup } = usePopup();
  const categoryDeleteClick = async () => {
    try {
      const date = await deleteCategory(nowCategoryNo);
      categoryChange();
      setNowCategoryNo(-1);
      setState(STATE.DEFAULT);
      openPopup("카테고리를 삭제하였습니다.");

      // handlePopupOpen(date.message);
    } catch (error) {
      console.error("카테고리 삭제 실패:", error.message);
      openPopup("카테고리를 삭제 실패하였습니다.");
    }
  };

  const handelCancle = () => {
    if (nowMenuNo > 0) setState(STATE.MENU_UPDATE);
    else setState(STATE.DEFAULT);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 7 }}>
        {/* 카테고리 */}
        <Grid
          item
          xs={12}
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            top: 100,
            zIndex: 1,
            backgroundColor: "white", // Ensure it has a background color to cover content behind it
            padding: 0, // Optional: Add padding to match the rest of your layout
          }}
        >
          <Categorys
            setState={setState}
            categoryItem={categoryItem}
            setNow={setNowCategoryNo}
            nowCategory={nowCategoryNo}
          />
        </Grid>

        {/* 메뉴 목록 */}
        <Grid item xs={6} sx={{ mt: 3 }}>
          <div className="scrollable">
            <Grid item xs={12}>
              {nowCategoryNo >= 0 ? (
                <Menus
                  categoryDelete={categoryDeleteClick}
                  setState={setState}
                  menuItem={menuItems}
                  setNow={setNowMenuNo}
                  nowMenu={nowMenuNo}
                  setImageUrl={setImageUrl}
                />
              ) : (
                <Grid
                  sx={{
                    paddingTop: 10,
                    display: "flex",
                    justifyContent: "center",
                    height: "100vh",
                  }}
                >
                  <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                    카테고리를 만들어 주세요.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </div>
        </Grid>

        {/* 상세보기 */}
        <Grid item xs={6}>
          <div>
            <PopupProvider>
              {state === STATE.MENU_UPDATE ? (
                <MenuUpdateForm
                  setState={setState}
                  menuItem={menuItem}
                  menuChange={menuChange}
                  nowCategoryNo={nowCategoryNo}
                  imageUrl={imageUrl}
                />
              ) : state === STATE.CATEGORY_CREATE ? (
                <CateforyForm
                  setState={setState}
                  categoryChange={categoryChange}
                  handelCancle={handelCancle}
                />
              ) : state === STATE.MENU_CREATE ? (
                <MenuCreateForm
                  setState={setState}
                  menuChange={menuChange}
                  nowCategoryNo={nowCategoryNo}
                  handelCancle={handelCancle}
                />
              ) : (
                <Grid
                  sx={{
                    paddingTop: 10,
                    display: "flex",
                    justifyContent: "center",
                    height: "100vh",
                  }}
                >
                  <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                    메뉴를 선택해 주세요
                  </Typography>
                </Grid>
              )}
            </PopupProvider>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Menu;
