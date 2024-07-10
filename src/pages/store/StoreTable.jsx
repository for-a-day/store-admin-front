import React, { useEffect, useState } from "react";
import { getStoreList } from "./StoreService";
import { Palette } from "../../components/palette/Palette";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";

const StoreTable = ({ setNowStore, setNowState }) => {
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await getStoreList();
        setStoreList(response);
      } catch (error) {}
    };

    fetchStore();
  }, []);

  const updateClick = (store) => {
    setNowStore(store);
    setNowState("update");
  };

  return (
    <>
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                번호
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                가맹점 이름
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                대표자
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                연락처
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                등록날짜
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                상태
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                관리
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {storeList && storeList.length > 0 ? (
            storeList.map((store) => (
              <TableRow key={store.storeNo}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {store.storeNo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {store.storeName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {store.rprName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {store.contact}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {store.contractDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {store.state == 1 ? "영업중" : "폐점"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateClick(store)}
                    sx={{
                      color: Palette.sub,
                      background: Palette.main,
                      "&:hover": {
                        color: Palette.sub,
                        background: Palette.dark,
                      },
                    }}
                  >
                    수정
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="h6" color="textSecondary">
                  등록된 지점이 없습니다.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto", mt: 2 }}>
        <div></div> {/* 빈 요소, 버튼을 맨 오른쪽으로 옮기기 위한 트릭 */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setNowState("create")}
          sx={{
            color: Palette.sub,
            background: Palette.main,
            "&:hover": {
              color: Palette.sub,
              background: Palette.dark,
            },
          }}
        >
          지점추가
        </Button>
      </Box>
    </>
  );
};

export default StoreTable;
