import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { updateStore, deleteStore } from "./StoreService";
import { usePopup } from "../../components/popup/PopupContext";

const StoreUpdateForm = ({ store, setNowState }) => {
  // const [store, setStore] = useState(null);
  const { openPopup } = usePopup();

  const [storeNo, setStoreNo] = useState("");
  const [storeName, setStoreName] = useState("");
  const [rprName, setRprName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [contractDate, setContractDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [warningCount, setWarningCount] = useState("");
  const [storeCode, setStoreCode] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [status, setStatus] = useState("inactive");

  useEffect(() => {
    if (store) {
      console.log("지점 : ", store);
      setStoreNo(store.storeNo);
      setStoreName(store.storeName);
      setRprName(store.rprName);
      setAddress(store.address);
      setContact(store.contact);
      setContractDate(store.contractDate);
      setExpirationDate(store.expirationDate);
      setWarningCount(store.warningCount);
      setStoreCode(store.storeCode);
      setAreaCode(store.areaCode);
      setStatus(store.state === 1 ? "active" : "inactive");
    }
  }, [store]);

  const handleDeleteClick = async () => {
    console.log("삭제 버튼이 클릭되었습니다.");
    openPopup("지점 삭제하시겠습니까? ", deleteStoreClick, true);
  };

  const deleteStoreClick = async () => {
    const storeDate = {
      storeNo: store.storeNo,
    };

    try {
      const data = await deleteStore(storeDate);

      console.log(data);
      console.log("지점 삭제 완료");
      setNowState("list");
    } catch (error) {
      console.log("지점 삭제 실패");
      // handlePopupOpen("지점 수정 실패");
    }
  };

  const handleClosePopup = () => {
    console.log("팝업이 닫혔을 때 실행할 작업입니다.");
    setNowState("list");
  };

  const handleConfirmClick = async () => {
    console.log("확인 버튼이 클릭되었습니다.");

    const storeDate = {
      storeNo: store.storeNo,
      storeName: storeName,
      rprName: rprName,
      address: address,
      contact: contact,
      expirationDate: expirationDate,
      warningCount: warningCount,
      areaCode: areaCode,
      state: status === "active" ? 1 : 0,
    };
    try {
      const data = await updateStore(storeDate);
      console.log(data);
      openPopup("지점 수정 완료", handleClosePopup);
      console.log("지점 수정 완료");
    } catch (error) {
      console.log("지점 수정 실패");
      // handlePopupOpen("지점 수정 실패");
    }
  };

  return (
    <div>
      <Card variant="outlined">
        <Box sx={{ padding: "15px 30px" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
            지점 수정하기
          </Typography>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <TextField
              id="store-no"
              label="지점 번호"
              value={storeNo}
              onChange={(e) => setStoreNo(e.target.value)}
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="store-name"
              label="지점 이름"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="rpr-name"
              label="대표자"
              value={rprName}
              onChange={(e) => setRprName(e.target.value)}
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="address"
              label="주소"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="contact"
              label="연락처"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="contract-date"
              label="계약 날짜"
              value={contractDate}
              onChange={(e) => setContractDate(e.target.value)}
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="expiration-date"
              label="만료 날짜"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="warning-count"
              label="경고 횟수"
              value={warningCount}
              onChange={(e) => setWarningCount(e.target.value)}
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="store-code"
              label="지점 코드"
              value={storeCode}
              onChange={(e) => setStoreCode(e.target.value)}
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="area-code"
              label="지역 코드"
              value={areaCode}
              onChange={(e) => setAreaCode(e.target.value)}
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <RadioGroup
              aria-label="store-status"
              name="store-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ flexDirection: "row", mb: 2 }}
            >
              <FormControlLabel
                value="active"
                control={<Radio />}
                label="영업 중"
              />
              <FormControlLabel
                value="inactive"
                control={<Radio />}
                label="영업 종료"
              />
            </RadioGroup>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteClick}
              >
                삭제
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmClick}
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

export default StoreUpdateForm;
