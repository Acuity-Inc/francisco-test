import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Box, Button, Container, Typography } from '@mui/material';
import Header from '../../components/Header/Header';

// the redirect page where the user is prompted to click a button to proceed to Okta Hosted Login
export const OktaRedirect = () => {
  const { oktaAuth } = useOktaAuth();

  const loggingIn = async () => oktaAuth.signInWithRedirect({ originalUri: '/' });

  return (
    <>
      <Header />
      <Box component='main' sx={{ pt: 4 }}>
        <Container maxWidth='sm'>
          <Box sx={{ my: 5 }}>
            <Typography variant='h4' component='h1' gutterBottom>
              Login Page
            </Typography>
            <Button variant='contained' onClick={loggingIn}>
              Login
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OktaRedirect;
