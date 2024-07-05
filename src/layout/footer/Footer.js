import React from 'react';
import { useLocation } from "react-router";
import { Link as RouterLink, NavLink } from "react-router-dom";
import {
  Box,
  Link,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {Menuitems} from "./data";

const Footer = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  const [open, setOpen] = React.useState(true);

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center', position: 'fixed', bottom: 0, bgcolor: 'background.paper' }}>

      <Box>
        <List sx={{ display: 'flex', justifyContent: 'center', p: 0 }}>
          {Menuitems && Menuitems.map((item, index) => (
            <ListItem
              key={item.title}
              onClick={() => handleClick(index)}
              button
              component={NavLink}
              to={item.href}
              selected={pathDirect === item.href}
              sx={{
                mx: 1,
                width:180,
                ...(pathDirect === item.href && {
                  color: "white",
                  backgroundColor: (theme) =>
                    `${theme.palette.primary.main}!important`,
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  ...(pathDirect === item.href && { color: "white" }),
                }}
              >
                <item.icon width="20" height="20" />
              </ListItemIcon>
              <ListItemText>{item.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>


    </Box>
  );
};

export default Footer;
