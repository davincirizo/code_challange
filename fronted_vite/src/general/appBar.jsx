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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import TemporaryDrawer from './drewer_temp';
import Logout from '../auth/logout';



const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar>

      <Container maxWidth="xl">

        <Toolbar disableGutters>
          <TemporaryDrawer />


          <AdbIcon sx={{ marginLeft: '15px', display: { xs: 'none', md: 'flex' }, mr: 1 }} />





          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <div style={{marginLeft:"1200px"}}>
            <Logout />
          </div>


        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
