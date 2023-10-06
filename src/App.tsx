import React from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './routes/HomePage/HomePage';
import CreatePage from './routes/CreatePage/CreatePage';
import getConfig from './okta/config';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback } from '@okta/okta-react';
import SecuredRoute from './routes/SecuredRoute/SecuredRoute';
import LoginPage from './routes/LoginPage/LoginPage';

const config = getConfig();
const oktaAuth = new OktaAuth(config.oidc);

export default function App() {
  const navigate = useNavigate();
  const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/'
          element={
            <SecuredRoute>
              <HomePage />
            </SecuredRoute>
          }
        />
        <Route
          path='/create'
          element={
            <SecuredRoute>
              <CreatePage />
            </SecuredRoute>
          }
        />
        <Route path='/login/callback' element={<LoginCallback />} />
      </Routes>
    </Security>
  );
}
