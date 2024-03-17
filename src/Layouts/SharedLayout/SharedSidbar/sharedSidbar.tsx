import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import { Assignment, CalendarToday, DateRange, ExitToApp, MenuBook, Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import "./styles.scss"
import useTokens from '../../../Hooks/Auth/useToken';
import { useAppMediaQuery } from '../../../Hooks/MediaQuery/use-app-media-query';
import useUrlParams from "../../../Hooks/URL/useUrl";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = ({  }) => {
  const navigate = useNavigate();
  const { clearTokens } = useTokens();
  const { isTabletOrMobile } = useAppMediaQuery();
  const [open, setOpen] = useState(false);

  const {addParam ,removeParam} =useUrlParams()

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
         className={"menu-icon"}
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
        sx={{justifyContent: "end"}}
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
            <ListItem button onClick={() => removeParam("filter")}>
              <ListItemIcon>
                <CalendarToday />
              </ListItemIcon>
              <ListItemText primary="All Tasks" />
            </ListItem>
            <ListItem button onClick={() => addParam("filter","pending")}>
              <ListItemIcon>
                <DateRange />
              </ListItemIcon>
              <ListItemText primary="Pending Tasks" />
            </ListItem>
            <ListItem button onClick={() => addParam("filter","completed")}>
              <ListItemIcon>
                <DateRange />
              </ListItemIcon>
              <ListItemText primary="Completed Tasks" />
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