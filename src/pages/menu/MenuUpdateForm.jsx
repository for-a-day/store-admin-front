import React, { useState, useEffect } from "react";
import { updateMenu, deleteMenu } from "./MenuService";
import axios from "axios";
import { usePopup } from "../../components/popup/PopupContext";
import noImg from "../../assets/images/noImg.jpg";
import { Palette } from "../../components/palette/Palette";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  Input,
} from "@mui/material";

const MenuUpdateForm = ({
  setState,
  menuItem,
  menuChange,
  nowCategoryNo,
  imageUrl,
}) => {
  const { openPopup } = usePopup();
  const [menuName, setMenuName] = useState("");
  const [menuId, setMenuId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [supplyPrice, setSupplyPrice] = useState("");
  const [status, setStatus] = useState("active"); // 'active' or 'inactive'

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      const fileURL = URL.createObjectURL(selectedFile);
      setFileUrl(fileURL);
    }
  };

  useEffect(() => {
    if (menuItem) {
      setMenuName(menuItem.menuName);
      setMenuId(menuItem.menuId);
      setDescription(menuItem.description);
      setPrice(menuItem.price);
      setSupplyPrice(menuItem.supplyPrice);
      setFileUrl(imageUrl);
      if (menuItem.menuImage) {
        const index = menuItem.menuImage.indexOf("_");
        if (index !== -1) {
          const result = menuItem.menuImage.substring(index + 1);
          setFileName(result);
        } else {
          setFileName(null);
        }
      } else {
        setFileName(null);
      }

      setStatus(menuItem.state === 1 ? "active" : "inactive"); // Assuming 'status' is part of menuItem
    }
  }, [menuItem]);

  const handleDeleteClick = () => {
    openPopup("정말로 삭제하시겠습니까?", deleteMenuClick, true);
  };

  const update = async () => {
    console.log("수정 버튼이 클릭되었습니다.");

    try {
      const formData = new FormData();
      formData.append("menuNo", menuItem.menuNo);
      formData.append("menuName", menuName);
      formData.append("menuId", menuId);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("supplyPrice", supplyPrice);
      formData.append("state", status === "active" ? 1 : 0);
      if (file) formData.append("file", file);
      formData.append("categoryNo", nowCategoryNo);

      const response = await updateMenu(formData);
      if (response.status && response.status !== 200) {
        openPopup("서버 응답 오류");
      } else {
        menuChange();
        openPopup("수정 완료");
      }
    } catch (error) {
      openPopup("수정 실패");
    }
  };

  const deleteMenuClick = async () => {
    try {
      const response = await deleteMenu(menuItem.menuNo);

      if (response.status && response.status !== 200) {
        openPopup("서버 응답 오류");
      } else {
        menuChange();
        setState("default");
        openPopup("메뉴 삭제 완료");
      }
    } catch (error) {
      openPopup("메뉴 삭제 실패");
    }
  };

  return (
    <div>
      <Card variant="outlined">
        <Box sx={{ padding: "15px 30px" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
            메뉴 수정하기
          </Typography>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <Box
              sx={{
                textAlign: "center",
                height: 200,
                width: 200,
              }}
            >
              {fileUrl ? (
                <img
                  src={fileUrl}
                  alt={menuItem.menuName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // 이미지가 박스 안에 맞도록 조정
                  }}
                  sx={{ mb: 2 }}
                />
              ) : (
                <img
                  src={noImg}
                  alt={noImg}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // 이미지가 박스 안에 맞도록 조정
                  }}
                />
              )}
            </Box>

            <div>
              <input
                id="menu-image"
                type="file"
                style={{ display: "none" }} // 실제 파일 입력 필드는 숨김
                onChange={handleFileChange}
              />
              <TextField
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={fileName ? fileName : "사진을 선택하세요"} // 선택된 파일의 이름을 텍스트 필드의 값으로 설정
                placeholder="선택된 파일 없음"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <Button
                      variant="contained"
                      component="label"
                      htmlFor="menu-image"
                      style={{
                        width: "40%",
                        height: "100%",
                        objectFit: "contain",
                        minWidth: 100, // 이미지가 박스 안에 맞도록 조정
                      }}
                      sx={{
                        color: Palette.sub,
                        background: Palette.main,
                        "&:hover": {
                          color: Palette.sub,
                          background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
                        },
                      }}
                    >
                      파일 선택
                    </Button>
                  ),
                }}
              />
            </div>

            <TextField
              id="menu-name"
              label="메뉴 이름"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="menu-code"
              label="메뉴 아이디"
              value={menuId}
              onChange={(e) => setMenuId(e.target.value)}
              type="text"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              id="description"
              label="메뉴 설명"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              id="menu-price"
              label="메뉴 가격"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              id="supply-price"
              label="재료 공급가"
              value={supplyPrice}
              onChange={(e) => setSupplyPrice(e.target.value)}
              type="number"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <RadioGroup
              aria-label="menu-status"
              name="menu-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{
                flexDirection: "row",
                mb: 2,

                color: Palette.dark, // 기본 색상
                "&.Mui-checked": {
                  color: Palette.dark,
                },
              }}
            >
              <FormControlLabel
                value="active"
                control={
                  <Radio
                    sx={{
                      color: Palette.dark, // 기본 색상
                      "&.Mui-checked": {
                        color: Palette.dark, // 선택된 색상
                      },
                    }}
                  />
                }
                label="판매 중"
              />
              <FormControlLabel
                value="inactive"
                control={
                  <Radio
                    sx={{
                      color: Palette.dark, // 기본 색상
                      "&.Mui-checked": {
                        color: Palette.dark, // 선택된 색상
                      },
                    }}
                  />
                }
                label="판매 종료"
              />
            </RadioGroup>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteClick}
                sx={{
                  color: Palette.sub,
                  background: Palette.red,
                  "&:hover": {
                    color: Palette.sub,
                    background: Palette.lightRed, // 마우스 호버 시 변경할 색상 지정
                  },
                }}
              >
                삭제
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={update}
                sx={{
                  color: Palette.sub,
                  background: Palette.main,
                  "&:hover": {
                    color: Palette.sub,
                    background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
                  },
                }}
              >
                확인
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuUpdateForm;
