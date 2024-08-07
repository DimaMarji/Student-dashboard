import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import { Assignment, CalendarToday, DateRange, ExitToApp, MenuBook, Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import "./styles.scss"
import useTokens from '../../../Hooks/Auth/useToken';
import { useAppMediaQuery } from '../../../Hooks/MediaQuery/use-app-media-query';
import useUrlParams from "../../../Hooks/URL/useUrl";
import { useDispatch } from 'react-redux';
import { resetUser } from '../../../Redux/userSlice';
import {useLanguage} from "../../../Context/Language/LanguageContext";
import StudentIcon from "../../../Assets/Icons/school.png";
import logo from "../../../Assets/Icons/open-book1.png";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = ({  }) => {
  const { clearTokens } = useTokens();
  const { isTabletOrMobile } = useAppMediaQuery();
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [open, setOpen] = useState(false);
  const {addParam ,removeParam} =useUrlParams()
  const {cultureCode, switchLanguage} = useLanguage();

  const handleSignOut = () => {
    dispatch(resetUser())
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
      <Drawer className='layout-sidebar' variant={isTabletOrMobile ? 'persistent' : 'permanent'}
              anchor={cultureCode?'right':"left"}
              open={isTabletOrMobile ? open : true}>
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
        <img src={logo} width={20} />
          <Typography variant="h6" fontSize={"2rem"}>Logo</Typography>
        </div>
        <Box width={250} className="sidebar-content">
          <List>
            <ListItem button onClick={() => removeParam("filter")}>
              <ListItemIcon>
              <img src={StudentIcon} width={24} />
              </ListItemIcon>
              <ListItemText primary="Student's Data" />
            </ListItem>
        
          </List>
          <List>
            <ListItem button onClick={handleSignOut}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;