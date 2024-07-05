import React, { useState, useEffect } from 'react';
import MenuCard from '../../components/BaseCard/MenuCard';
import { getTableList, getOrderList } from './OrderService';
import { Link as RouterLink, NavLink } from "react-router-dom";
import {
  Box,
  ListItemText,
  Button,
  Grid,
} from "@mui/material";

const OrderList = ({ nowTable, setNow , reload, setTableName}) => {

  const [tables, setTableList] = useState([]);
  const [orders, setOrderList] = useState([]);
  
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const tableList = await getTableList(localStorage.getItem('storeNo'));
        setTableList(tableList);
      } catch (error) {}
    };

    const fetchOrders = async () => {
      try {
        const orderList = await getOrderList(localStorage.getItem('storeNo'));
        setOrderList(orderList);
      } catch (error) {}
    };

    setNow(0);
    fetchTables();
    fetchOrders();
  }, [reload]);


  const handleClick = (tableNo, tableName) => {
    setNow(tableNo);
    setTableName(tableName);
  };


  return (
    <Box>
      <Grid container spacing={2}>
        {tables && tables.map((item) => {
          const tableOrders = orders.filter(order => order.tableNo === item.tableNo);
          const totalAmount = tableOrders.reduce((sum, order) => sum + order.amount, 0);
          // console.log("주문 내역 : ", tableOrders);

          return (
            <Grid item key={item.tableNo} xs={12} sm={6} md={4} lg={3}>
              <MenuCard title={item.tableName}>
                <Box
                  sx={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    width: 100,
                    height: 100,
                    ...(nowTable === item.tableNo && {
                      color: 'white',
                      backgroundColor: (theme) => `${theme.palette.primary.main}!important`,
                    }),
                  }}
                  onClick={() => handleClick(item.tableNo, item.tableName)}
                >

                  {tableOrders? (
                     <ListItemText>
                     <div>
                       {tableOrders.map(order => (
                         <div key={order.orderNo}>
                           {order.orderMenuList.map(menu => (
                             <div key={menu.menuNo} style={{ display: 'flex', justifyContent: 'space-between' }}>
                               <span>{menu.menuName}</span>
                               <span>{menu.quantity}</span>
                             </div>
                           ))}
                         </div>
                       ))}
                     </div>
                     <div style={{ marginTop: '1rem' }}>{totalAmount === 0?'':totalAmount}</div>
                   </ListItemText>
                  ):(null)}


                </Box>
              </MenuCard>
            </Grid>
          );
        })}
      </Grid>

      
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mt: 2 }}
      >
        <Button variant="contained" color="primary"
        component={NavLink}
        to='../payment'
        >
          영수증 관리
        </Button>
      </Grid>

      
    </Box>
  );
};

export default OrderList;
