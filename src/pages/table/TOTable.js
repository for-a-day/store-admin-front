import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const TOTable = () => {
  const [tableList, setTableList] = useState([]);

  const getTables = async () => {
    const storeNo = localStorage.getItem('storeNo');
    console.log(storeNo);
    try {
      const response = await axios.get(`http://localhost:9001/table?storeNo=${storeNo}`);
      const tableList = response.data.data.tableList;

      if (tableList) {
        tableList.sort((a, b) => a.tableNumber - b.tableNumber);
      }

      setTableList(tableList);
    } catch (error) {
      console.error('Error get tables:', error);
      throw error;
    }
  }

  useEffect(() => { getTables(); }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  }


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
                테이블번호
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                테이블명
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                테이블코드
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
                등록 날짜
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
                상태
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableList && tableList.map((table) => (
            <TableRow key={table.tableCode}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {table.tableNumber}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {table.tableName}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {table.tableCode}
                </Typography>
              </TableCell>
              <TableCell >
                <Typography variant="h6">{formatDate(table.registerDate)}</Typography>
              </TableCell>
              <TableCell >
                <Typography variant="h6">{table.state === 1 ? '등록됨' : '등록대기중'}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TOTable;
