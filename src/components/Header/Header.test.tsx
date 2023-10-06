import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

const mockSignInWithRedirect = jest.fn();
const mockSignOut = jest.fn();
let mockIsAuthenticated = false;
jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: { isAuthenticated: mockIsAuthenticated },
      authService: {},
      oktaAuth: { signInWithRedirect: mockSignInWithRedirect, signOut: mockSignOut },
    };
  },
}));

describe('Header', () => {
  it('renders Header', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const createLink = getByRole('button', { name: 'Create' });
    const homeLink = getByRole('button', { name: 'Home' });
    expect(createLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });

  it('allows user to login', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const loginButton = getByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(mockSignInWithRedirect).toHaveBeenCalledTimes(1);
  });

  it('allows user to logout', () => {
    mockIsAuthenticated = true;
    const { getByRole } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logoutButton = getByRole('button', { name: 'Logout' });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});
