import React from "react";

import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Chip,
} from "@mui/material";

const MenuCard = (props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 0,
        width: "100%",
        minHeight:'220px',
        maxHeight:'220px',
        
        cursor: 'pointer',
      }}
      onClick={props.onClick}
    >
      <Box p={2} display="flex" alignItems="center"
         sx={{
          background: props.background,
          cursor: 'pointer',
        }}

        onClick={props.onClick}
        
        >
        <Box
          sx={{
            flex: '1',              // menuName이 가능한 공간을 최대한 차지
            whiteSpace: 'nowrap',   // 텍스트가 넘칠 때 줄바꿈을 막음
            overflow: 'hidden',     // 넘친 텍스트를 숨김
            textOverflow: 'ellipsis', // 넘친 텍스트에 ...으로 표시
          
            cursor: 'pointer',
          }}  

          
          onClick={props.onClick}
        >
          
          
          <Typography variant="h4" sx={{
            color: props.color,
            whiteSpace: 'nowrap',   // 텍스트가 넘칠 때 줄바꿈을 막음
            overflow: 'hidden',     // 넘친 텍스트를 숨김
            textOverflow: 'ellipsis' // 넘친 텍스트에 ...으로 표시
          }}>
            
            {props.title}</Typography>
          </Box>
          {props.chiptitle ? (
            <Chip
              label={props.chiptitle}
              size="small"
              sx={{
                ml: "auto",
                fontSize: "12px",
                fontWeight: "500",
              }}
            ></Chip>
          ) : (
            ""
          )}
      </Box>
      <Divider />
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default MenuCard;
