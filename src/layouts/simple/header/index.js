
import { useState, useContext } from 'react';
import { useHistory ,useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
import { Link as RouterLink } from 'react-router-dom';

// auth context from store
import AuthContext from 'src/_store/auth-context';
import Logo from '../../../components/logo';
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: "100%",
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const authCtx = useContext(AuthContext);
  const location = useLocation()
  return (
    <StyledRoot>
      <StyledToolbar>
        {/* <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton> */}

        {/* <Searchbar /> */}
        <Box sx={{ px: 1, py: 3, display: 'inline-flex' }}>
          <Logo />
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <LanguagePopover />
          <NotificationsPopover /> */}

          {authCtx.user && <AccountPopover />}
          {!authCtx.user  && location.pathname !== '/login' &&
            <Button component={RouterLink} to={'/login'} variant="contained">Login</Button>
          }

        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
