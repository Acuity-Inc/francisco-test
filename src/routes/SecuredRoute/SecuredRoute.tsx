import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { Navigate } from 'react-router-dom';

const SecuredRoute = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useOktaAuth();

  const isAuthenticated = authState?.isAuthenticated;

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAuthenticated ? <>{children}</> : <Navigate to='/login' />;
};

export default SecuredRoute;
