import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./routes/SecuredRoute/SecuredRoute', () => ({
  __esModule: true,
  default: () => <div data-testid='secured-route'></div>,
}));

test('renders SecuredRoute component when the route is /', () => {
  const { getByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const homePageElement = getByTestId('secured-route');
  expect(homePageElement).toBeInTheDocument();
});
