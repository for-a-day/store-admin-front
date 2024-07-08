import React, { useState } from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { createStore } from "./StoreService";
import { usePopup } from "../../components/popup/PopupContext";

const StoreCreateForm = ({ setNowState }) => {
  const { openPopup } = usePopup();

  const [storeName, setStoreName] = useState("");
  const [rprName, setRprName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [contractDate, setContractDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [warningCount, setWarningCount] = useState("");
  const [storeCode, setStoreCode] = useState("");
  const [areaCode, setAreaCode] = useState("");

  const handleCancelClick = () => {
    console.log("취소 버튼이 클릭되었습니다.");
    setNowState("list");
  };

  const handleClosePopup = () => {
    console.log("팝업이 닫혔을 때 실행할 작업입니다.");
    setNowState("list");
  };

  const handleConfirmClick = async () => {
    console.log("확인 버튼이 클릭되었습니다.");

    const storeDate = {
      storeName: storeName,
      rprName: rprName,
      address: address,
      contact: contact,
      contractDate: contractDate,
      expirationDate: expirationDate,
      storeCode: storeCode,
      areaCode: areaCode,
    };

    try {
      const data = await createStore(storeDate);
      openPopup("지점 추가 완료", handleClosePopup);
    } catch (error) {
      console.error("지점 추가 실패", error);
    }
  };

  return (
    <div>
      <Card variant="outlined">
        <Box sx={{ padding: "15px 30px" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
            지점 추가하기
          </Typography>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <TextField
              id="store-name"
              label="지점 이름"
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
            <TextField
              id="rpr-name"
              label="대표자"
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={rprName}
              onChange={(e) => setRprName(e.target.value)}
            />
            <TextField
              id="address"
              label="주소"
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              id="contact"
              label="연락처"
              type="tel"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <TextField
              id="contract-date"
              label="계약 날짜"
              type="date"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
              value={contractDate}
              onChange={(e) => setContractDate(e.target.value)}
            />

            <TextField
              id="expiration-date"
              label="만료 날짜"
              type="date"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
            <TextField
              id="store-code"
              label="지점 코드 (최대 6자)"
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={storeCode}
              onChange={(e) => setStoreCode(e.target.value.slice(0, 6))}
            />
            <TextField
              id="area-code"
              label="지역 코드"
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={areaCode}
              onChange={(e) => setAreaCode(e.target.value)}
            />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleCancelClick}
              >
                취소
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

export default StoreCreateForm;
