import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { Drawer, DrawerHeader } from "./styles";
import Link from 'next/link';

export function Sidebar() {
  const [drawerVisibility, setDrawerVisibility] = useState(true);

  const handleDrawerVisibility = () => {
    setDrawerVisibility(!drawerVisibility);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" open={drawerVisibility}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerVisibility}>
            { drawerVisibility ? <CloseIcon /> : <MenuIcon /> }
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link href={"/"}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton sx={[ { minHeight: 48, px: 2.5, }, { justifyContent: drawerVisibility ? "initial" : "center" } ]}>
                <ListItemIcon sx={[ { minWidth: 0, justifyContent: 'center', }, { mr: drawerVisibility ? 3 : "auto" }, ]} >
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" sx={[ { opacity: drawerVisibility ? 1 : 0 } ]} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href={"/users"}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton sx={[ { minHeight: 48, px: 2.5, }, { justifyContent: drawerVisibility ? "initial" : "center" } ]}>
                <ListItemIcon sx={[ { minWidth: 0, justifyContent: 'center', }, { mr: drawerVisibility ? 3 : "auto" }, ]} >
                  <PersonIcon/>
                </ListItemIcon>
                <ListItemText primary="Users" sx={[ { opacity: drawerVisibility ? 1 : 0 } ]} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </Box>
  );
}