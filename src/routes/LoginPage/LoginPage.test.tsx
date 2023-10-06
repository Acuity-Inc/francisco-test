import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';

const mockSignInWithRedirect = jest.fn();
const mockSignOut = jest.fn();
let mockIsAuthenticated = true;
jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: { isAuthenticated: mockIsAuthenticated },
      authService: {},
      oktaAuth: { signInWithRedirect: mockSignInWithRedirect, signOut: mockSignOut },
    };
  },
}));

jest.mock('../HomePage/HomePage.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid='home-page'></div>,
}));

describe('SecuredRoute', () => {
  it('renders Home Page when user is authenticated', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const loginButton = getByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(mockSignInWithRedirect).toHaveBeenCalledTimes(1);
  });
});
