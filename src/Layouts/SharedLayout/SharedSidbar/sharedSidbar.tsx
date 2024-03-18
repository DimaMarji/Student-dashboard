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
  const { clearTokens } = useTokens();
  const { isTabletOrMobile } = useAppMediaQuery();
  const navigate=useNavigate()
  
  const [open, setOpen] = useState(false);
  const {addParam ,removeParam} =useUrlParams()

  const handleSignOut = () => {
    clearTokens();
    navigate("/login", {replace: true})
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
        <img src="/to-do-list.png" width={32} />
          <Typography variant="h6">TaskMaster</Typography>
        </div>
        <Box width={250} className="sidebar-content">
          <List>
            <ListItem button onClick={() => removeParam("filter")}>
              <ListItemIcon>
              <img src="/task.png" width={24} />
              </ListItemIcon>
              <ListItemText primary="All Tasks" />
            </ListItem>
            <ListItem button onClick={() => addParam("filter","pending")}>
              <ListItemIcon>
              <img src="/clock.png" width={24} />
              </ListItemIcon>
              <ListItemText primary="Pending Tasks" />
            </ListItem>
            <ListItem button onClick={() => addParam("filter","completed")}>
              <ListItemIcon>
              <img src="/done.png" width={24} />
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