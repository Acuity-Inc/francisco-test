import React from 'react';
import { render } from '@testing-library/react';
import SecuredRoute from './SecuredRoute';
import { MemoryRouter } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import HomePage from '../HomePage/HomePage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: ({ to }: { to: string }) => <div data-testid='navigate' data-to={to}></div>,
}));

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: jest.fn(),
}));

jest.mock('../HomePage/HomePage.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid='home-page'></div>,
}));

describe('SecuredRoute', () => {
  it('renders Home Page when user is authenticated', () => {
    (useOktaAuth as jest.Mock).mockReturnValue({
      authState: {
        isAuthenticated: true,
      },
    });
    const { getByTestId } = render(
      <MemoryRouter>
        <SecuredRoute>
          <HomePage />
        </SecuredRoute>
      </MemoryRouter>
    );
    const homePageElement = getByTestId('home-page');
    expect(homePageElement).toBeInTheDocument();
  });

  it('navigates to login when user is not authenticated', () => {
    (useOktaAuth as jest.Mock).mockReturnValue({
      authState: {
        isAuthenticated: false,
      },
    });
    const { getByTestId } = render(
      <MemoryRouter>
        <SecuredRoute>
          <HomePage />
        </SecuredRoute>
      </MemoryRouter>
    );

    const navigateElement = getByTestId('navigate');
    expect(navigateElement).toBeInTheDocument();
    expect(navigateElement).toHaveAttribute('data-to', '/login');
  });
});
