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
        minWidth:'150px',
        maxWidth:'150px',
        
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
            flex: '1',              
            whiteSpace: 'nowrap',   
            overflow: 'hidden',     
            textOverflow: 'ellipsis', 
          
            cursor: 'pointer',
          }}  

          
          onClick={props.onClick}
        >
          
          
          <Typography variant="h4" sx={{
            color: props.color,
            whiteSpace: 'nowrap', 
            overflow: 'hidden',    
            textOverflow: 'ellipsis' 
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
