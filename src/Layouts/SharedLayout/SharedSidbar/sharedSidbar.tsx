import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import { Assignment, CalendarToday, DateRange, ExitToApp, MenuBook, Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import "./styles.scss"
import useTokens from '../../../Hooks/useToken';
import { useAppMediaQuery } from '../../../Hooks/MediaQuery/use-app-media-query';

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = ({  }) => {
  const navigate = useNavigate();
  const { clearTokens } = useTokens();
  const { isTabletOrMobile } = useAppMediaQuery();
  const [open, setOpen] = useState(false);

  const handleMenuClick = (route: string) => {
    navigate(route);
  };

  const handleSignOut = () => {
    clearTokens();
  };

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
     {isTabletOrMobile && <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleToggleSidebar}
      >
        <Menu />
      </IconButton>}
      <Drawer className='layout-sidebar' variant={isTabletOrMobile ? 'persistent' : 'permanent'} anchor="left" open={isTabletOrMobile ? open : true}>
      {isTabletOrMobile && open && <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleToggleSidebar}
      >
        <Menu />
      </IconButton>}
        <div className='app-logo'>
          <Assignment fontSize="medium" />
          <Typography variant="h6">TaskMaster</Typography>
        </div>
        <Box width={250} className="sidebar-content">
          <List>
            <ListItem button onClick={() => handleMenuClick('/today')}>
              <ListItemIcon>
                <CalendarToday />
              </ListItemIcon>
              <ListItemText primary="Today" />
            </ListItem>
            <ListItem button onClick={() => handleMenuClick('/next-7-days')}>
              <ListItemIcon>
                <DateRange />
              </ListItemIcon>
              <ListItemText primary="Next 7 Days" />
            </ListItem>
          </List>
          <List>
            <ListItem button onClick={handleSignOut}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;