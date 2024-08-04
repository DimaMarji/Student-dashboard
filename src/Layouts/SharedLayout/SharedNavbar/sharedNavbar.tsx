import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import "./styles.scss"
import {FormControl, Grid, Select} from "@mui/material";
import {CultureCode} from "../../../Constants/Language/cultureCode";
import {useLanguage} from "../../../Context/Language/LanguageContext";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const  SharedNavbar=()=> {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

    const {cultureCode, switchLanguage} = useLanguage();

  return (
    <AppBar position="static" className='navbar' sx={{backgroundColor:"#FFF"}}>
      <Container>
        <Toolbar disableGutters className={"navbar-content"}>

                <div className={"user-details"}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                <Typography fontSize={"1.5rem"} component="h6" variant="h6" color={"#666666"}
                >
                    Remy Sharp
                </Typography>
                </div>


            <FormControl fullWidth>
                <Select
                    className={"lang-select"}
                    value={cultureCode}
                    onChange={(event) => {
                        switchLanguage(event?.target?.value)
                    }}
                >
                    <MenuItem value={CultureCode.EN}>English</MenuItem>
                    <MenuItem value={CultureCode.AR}>العربية</MenuItem>
                </Select>
            </FormControl>
        </Toolbar>
      </Container>
    </AppBar>
  );

}
export default SharedNavbar;
