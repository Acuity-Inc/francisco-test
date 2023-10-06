import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

function Header() {
  const { oktaAuth, authState } = useOktaAuth();

  const loggingIn = async () => oktaAuth.signInWithRedirect({ originalUri: '/' });

  const LoggingOut = async () => oktaAuth.signOut();

  return (
    <AppBar component='nav'>
      <Toolbar>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          WELCOME
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Link to='/'>
            <Button sx={{ color: '#fff' }}>Home</Button>
          </Link>
          <Link to='/create'>
            <Button sx={{ color: '#fff' }}>Create</Button>
          </Link>
        </Box>
        {authState?.isAuthenticated ? (
          <Button sx={{ color: '#fff' }} onClick={LoggingOut}>
            Logout
          </Button>
        ) : (
          <Button sx={{ color: '#fff' }} onClick={loggingIn}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
